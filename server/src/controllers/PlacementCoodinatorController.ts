import { type Response, type Request, application } from "express";
import {
  applications,
  company,
  interview,
  place_cord,
  students,
} from "../models";
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
      const start_time = new Date(`${req.body.start_time}+05:30`);
      const end_time = new Date(`${req.body.end_time}+05:30`);
      const loc = req.body.location as string;

      console.log(usn, compid, start_time, end_time, loc);

      const studentSlots = await db
        .select({
          start_time: interview.start_time,
          end_time: interview.end_time,
        })
        .from(interview)
        .where(eq(interview.usn, usn));

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
      console.log(compName[0].name);
      const icalData = temp.CreateIcalFile({
        id: result[0].id,
        compName: compName[0].name,
        usn: usn,
        location: loc,
        start_time: start_time,
        end_time: end_time,
      });

      const email = await db
        .select({ email: students.email })
        .from(students)
        .where(eq(students.usn, usn));

      const mailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Interview Schedule</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  color: #333;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
              }
              .header {
                  background-color: #4CAF50;
                  color: white;
                  padding: 10px;
                  text-align: center;
              }
              .content {
                  padding: 20px;
              }
              .footer {
                  text-align: center;
                  padding: 10px;
                  color: #777;
                  font-size: 12px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Interview Scheduled</h1>
              </div>
              <div class="content">
                  <p>Dear ${usn},</p>
                  <p>Your interview for the company ${compName[0].name} has been scheduled as follows:</p>
                  <ul>
                      <li><strong>Start:</strong> ${start_time}</li>
                      <li><strong>End:</strong> ${end_time}</li>
                      <li><strong>Venue:</strong> ${loc}</li>
                  </ul>
                  <p>Please arrive at the venue 15 minutes early and bring your resume, a valid ID, and any other necessary documents.</p>
                  <p>If you have any questions, feel free to contact us.</p>
                  <p>Best regards,</p>
                  <p>Placement Cell</p>
              </div>
              <div class="footer">
                  <p>This is an automated message, please do not reply.</p>
              </div>
          </div>
      </body>
      </html>
      
      `;

      const mail = {
        to: email[0].email,
        subject: "Interview Schedule",
        html: mailHtml,
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

      const mailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Interview Cancellation</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background-color: #FF0000;
                    color: white;
                    padding: 10px;
                    text-align: center;
                }
                .content {
                    padding: 20px;
                }
                .footer {
                    text-align: center;
                    padding: 10px;
                    color: #777;
                    font-size: 12px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Interview Cancelled</h1>
                </div>
                <div class="content">
                    <p>Dear ${interviewDetails[0].usn},</p>
                    <p>We regret to inform you that your interview scheduled for ${cmpName[0]} has been cancelled:</p>
                    <p>We apologize for any inconvenience this may cause. Please feel free to reach out to us if you have any questions or need further assistance.</p>
                    <p>Best regards,</p>
                    <p>Placement Office</p>
                
                </div>
                <div class="footer">
                    <p>This is an automated message, please do not reply.</p>
                </div>
            </div>
        </body>
        </html>
        `;

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

      const mailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Interview Schedule</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  color: #333;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
              }
              .header {
                  background-color: #4CAF50;
                  color: white;
                  padding: 10px;
                  text-align: center;
              }
              .content {
                  padding: 20px;
              }
              .footer {
                  text-align: center;
                  padding: 10px;
                  color: #777;
                  font-size: 12px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Interview Scheduled</h1>
              </div>
              <div class="content">
                  <p>Dear ${interviewDetails[0].usn},</p>
                  <p>Your interview for the company ${compName} has been scheduled as follows:</p>
                  <ul>
                      <li><strong>Start:</strong> ${start_time}</li>
                      <li><strong>End:</strong> ${end_time}</li>
                      <li><strong>Venue:</strong> ${location}</li>
                  </ul>
                  <p>Please arrive at the venue 15 minutes early and bring your resume, a valid ID, and any other necessary documents.</p>
                  <p>If you have any questions, feel free to contact us.</p>
                  <p>Best regards,</p>
                  <p>Placement Cell</p>
              </div>
              <div class="footer">
                  <p>This is an automated message, please do not reply.</p>
              </div>
          </div>
      </body>
      </html>
      
      `;

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

  async getPlacementCoordinators(req: Request, res: Response) {
    try {
      let result = await db
        .select()
        .from(place_cord)
        .fullJoin(students, eq(place_cord.usn, students.usn))
        .where(eq(students.usn, place_cord.usn));
      //@ts-ignore
      result = result.map((item) => {
        return {
          usn: item.place_cord?.usn,
          name: item.students?.name,
          email: item.students?.email,
        };
      });
      res.status(200).json({ data: result });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something Went Wrong!" });
    }
  }
}

export default new PlacementCoordinatorController();
