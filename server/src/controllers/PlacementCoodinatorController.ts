import { type Response, type Request, application } from "express";
import { applications, company, interview, students } from "../models";
import db from "../utils/DataSource";
import { and, eq, gt } from "drizzle-orm";
import ical from "ical-generator";
import contactEmail from "../utils/MailService";
class PlacementCoordinatorController {
  async addCompany(req: Request, res: Response) {
    try {
      const newcompany = req.body;
      console.log(newcompany);
      const result = await db.insert(company).values(newcompany);
      res.status(201).json({ message: "Company addition is sucessful." });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    }
  }
  CreateIcalFile(interviewDetails: {
    id: number;
    compName: string;
    usn: string;
    location: string;
    start_time: Date;
    end_time: Date;
  }): string {
    const calender = ical({
      name: `Interview Schedule of ${interviewDetails.id} `,
    });
    const intEvent = calender.createEvent({
      start: interviewDetails.start_time,
      end: interviewDetails.end_time,
      summary: `Interview with ${interviewDetails.compName}`,
      location: interviewDetails.location,
      id: interviewDetails.id,
      description: `Interview with ${interviewDetails.compName} for ${interviewDetails.usn}`,
    });
    return calender.toString();
  }

  async BookSlot(req: Request, res: Response) {
    /**
     * This should be refined
     */

    try {
      const usn = req.body.usn as string;
      const compid = req.body.compid as number;
      const start_time = new Date(req.body.start_time);
      const end_time = new Date(req.body.end_time);
      const loaction = req.body.location as string;

      const studentSlots = await db
        .select({
          start_time: interview.start_time,
          end_time: interview.end_time,
        })
        .from(interview)
        .where(
          and(eq(interview.usn, usn), gt(interview.start_time, new Date()))
        );

      const companySlots = await db
        .select({
          start_time: interview.start_time,
          end_time: interview.end_time,
        })
        .from(interview)
        .where(
          and(
            eq(interview.compid, compid),
            gt(interview.start_time, new Date())
          )
        );

      let flag = false;
      for (let i = 0; i < studentSlots.length; i++) {
        if (
          (start_time >= studentSlots[i].start_time &&
            start_time <= studentSlots[i].end_time) ||
          (end_time >= studentSlots[i].start_time &&
            end_time <= studentSlots[i].end_time)
        ) {
          flag = true;
          break;
        }
      }
      for (let i = 0; i < companySlots.length; i++) {
        if (
          (start_time >= companySlots[i].start_time &&
            start_time <= companySlots[i].end_time) ||
          (end_time >= companySlots[i].start_time &&
            end_time <= companySlots[i].end_time)
        ) {
          flag = true;
          break;
        }
      }

      if (flag) {
        res.status(400).json({ message: "Slot is already booked" });
        return;
      }

      const result = await db
        .insert(interview)
        .values({ usn, compid: compid, start_time, end_time })
        .returning();

      const compName = await db
        .select({ name: company.name })
        .from(company)
        .where(eq(company.id, compid));
      const temp = new PlacementCoordinatorController();
      const icalData = temp.CreateIcalFile({
        id: result[0].id,
        compName: compName[0].name,
        usn: usn,
        location: loaction,
        start_time: start_time,
        end_time: end_time,
      });

      const email = await db
        .select({ email: students.email })
        .from(students)
        .where(eq(students.usn, usn));

      const mail = {
        to: email[0].email,
        subject: "Interview Schedule",
        text: "Please find the attached ical file for interview schedule",
        icalEvent: {
          content: icalData,
          method: "request",
        },
      };
      // Send mail
      contactEmail.sendMail(mail, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          res.status(201).json({
            message: "Slot booked successfully",
            id: result[0].id,
          });
        }
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    }
  }

  async getCompanies(req: Request, res: Response) {
    try {
      const result = await db.select().from(company);
      res.status(200).json({ data: result });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    }
  }

  async cancelSlot(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const calender = ical({ name: `Interview Schedule of ${id} ` });
      const interviewDetails = await db
        .select()
        .from(interview)
        .where(eq(interview.id, id));
      const cmpName = await db
        .select({ name: company.name })
        .from(company)
        .where(eq(company.id, interviewDetails[0].compid));
      const cancelledEvent = calender.createEvent({
        start: new Date(),
        end: new Date(),
        summary: `Interview Cancelled`,
        id: id,
        description: `Interview Cancelled`,
      });

      const email = await db
        .select({ email: students.email })
        .from(students)
        .where(eq(students.usn, interviewDetails[0].usn));

      const mail = {
        to: email[0].email,
        subject: "Interview Cancelled",
        text: "Interview has been cancelled",
        icalEvent: {
          content: calender.toString(),
          method: "cancel",
        },
      };
      // Send mail

      contactEmail.sendMail(mail, (err, info) => {
        if (err) {
          console.log(err);
          res.status(400).json({ message: "Something went wrong!" });
        } else {
          res.status(200).json({ message: "Slot cancelled successfully" });
        }
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    }
  }

  async updateSlot(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const start_time = new Date(req.body.start_time);
      const end_time = new Date(req.body.end_time);
      const location = req.body.location;
      const interviewDetails = await db
        .select()
        .from(interview)
        .where(eq(interview.id, id));
      const studentSlots = await db
        .select({
          start_time: interview.start_time,
          end_time: interview.end_time,
        })
        .from(interview)
        .where(
          and(
            eq(interview.usn, interviewDetails[0].usn),
            gt(interview.start_time, new Date())
          )
        );

      const companySlots = await db
        .select({
          start_time: interview.start_time,
          end_time: interview.end_time,
        })
        .from(interview)
        .where(
          and(
            eq(interview.compid, interviewDetails[0].compid),
            gt(interview.start_time, new Date())
          )
        );

      let flag = false;
      for (let i = 0; i < studentSlots.length; i++) {
        if (
          (start_time >= studentSlots[i].start_time &&
            start_time <= studentSlots[i].end_time) ||
          (end_time >= studentSlots[i].start_time &&
            end_time <= studentSlots[i].end_time)
        ) {
          flag = true;
          break;
        }
      }
      for (let i = 0; i < companySlots.length; i++) {
        if (
          (start_time >= companySlots[i].start_time &&
            start_time <= companySlots[i].end_time) ||
          (end_time >= companySlots[i].start_time &&
            end_time <= companySlots[i].end_time)
        ) {
          flag = true;
          break;
        }
      }

      if (flag) {
        res.status(400).json({ message: "Slot is already booked" });
        return;
      }

      const result = await db
        .update(interview)
        .set({ start_time, end_time })
        .where(eq(interview.id, id))
        .returning();

      const compName = await db
        .select({ name: company.name })
        .from(company)
        .where(eq(company.id, interviewDetails[0].compid));

      const temp = new PlacementCoordinatorController();
      const icalData = temp.CreateIcalFile({
        id: id,
        compName: compName[0].name,
        usn: interviewDetails[0].usn,
        location: location,
        start_time: start_time,
        end_time: end_time,
      });

      const email = await db
        .select({ email: students.email })
        .from(students)
        .where(eq(students.usn, interviewDetails[0].usn));

      const mail = {
        to: email[0].email,
        subject: "Interview Schedule Updated",
        text: "Please find the attached ical file for interview schedule",
        icalEvent: {
          content: icalData,
          method: "request",
        },
      };
      // Send mail
      contactEmail.sendMail(mail, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({ message: "Slot updated successfully" });
        }
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    }
  }

  async getSlotsByCompany(req: Request, res: Response) {
    try {
      const compid = parseInt(req.params.compid);
      const result = await db
        .select()
        .from(interview)
        .where(eq(interview.compid, compid));
      res.status(200).json({ data: result });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    }
  }

  async getStudentsByAppliedCompany(req: Request, res: Response) {
    try {
      const compid = parseInt(req.params.compid);
      const result = await db
        .select()
        .from(applications)
        .where(eq(applications.compid, compid));
      res.status(200).json({ data: result });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    }
  }
}

export default new PlacementCoordinatorController();
