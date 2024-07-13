import { type Request, type Response } from "express";
import db from "../utils/DataSource";
import {
  students,
  studCourse,
  interview,
  company,
  applications,
  courses,
} from "../models";
import { and, eq } from "drizzle-orm";
import AxiosHandler from "../middleware/AxiosHandler";
class StudentController {
  async findAllStudents(req: Request, res: Response) {
    console.log("entered here");
    try {
      const result = await db.select().from(students);

      res.status(200).json({ data: result });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Something went wrong" });
    }
  }

  async findByUsn(req: Request, res: Response) {
    try {
      const usn = req.params.usn;
      const result = await db
        .select()
        .from(students)
        .where(eq(students.usn, usn));
      res.status(200).json({ data: result });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    }
  }

  async createStudent(req: Request, res: Response) {
    try {
      const newStudent = req.body;
      const result = await db.insert(students).values(newStudent);
      console.log(result);
      res.status(201).json({ message: "Inserstion Sucessful" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went Wrong!" });
    }
  }

  async updateStudent(req: Request, res: Response) {
    try {
      const existingStudent = req.body;
      const result = await db
        .select()
        .from(students)
        .where(eq(students.usn, existingStudent.usn));
      if (!result) {
        throw new Error("Non exsistant student.");
      }
      const updatedResult = await db
        .update(students)
        .set(existingStudent)
        .where(eq(students.usn, existingStudent.usn));
      console.log(updatedResult);
      res.status(201).json({ message: "Updation Sucessful" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went Wrong!" });
    }
  }

  async fetchCourses(req: Request, res: Response) {
    try {
      const usn = req.params.usn;
      const studSem = await db
        .select({
          sem: students.sem,
        })
        .from(students)
        .where(eq(students.usn, usn));
      console.log(studSem);
      const result = await db
        .select()
        .from(studCourse)
        .fullJoin(courses, eq(studCourse.cid, courses.cid))
        .where(
          and(eq(studCourse.usn, usn), eq(courses.semester, studSem[0].sem))
        );
      const response = result.map((item) => {
        return {
          ...item.stud_course,
          ...item.courses,
        };
      });
      res.status(200).send({ data: response });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something Went Wrong!" });
    }
  }

  async PredictCTC(req: Request, res: Response) {
    /**
         * Uses extenal api
         * body should contain these parameters
         * {
            'no_of_dsa': noOfDsa,
            'knows_ml': knowsMl ? 1 : 0,
            'knows_python': knowsPython ? 1 : 0,
            'knows_dsa': knowsDsa ? 1 : 0,
            'knows_js': knowsJs ? 1 : 0,
            'knows_html': knowsHtml ? 1 : 0,
            'knows_css': knowsCss ? 1 : 0,
            'was_coding_club': wasCodingClub ? 1 : 0,
            'cgpa': student.cgpa,
            'branch': branch,
            'no_of_backlogs': noOfBacklogs,
            };
         */
    try {
      const result = await AxiosHandler.post(
        `${process.env.PY_SERVER}/predict`,
        req.body,
        {
          "Content-Type": "application/json",
        }
      );
      res.status(200).json({ data: result });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Unable to process the request." });
    }
  }

  async GetSlots(req: Request, res: Response) {
    /**
     * This will be done later
     */
    const usn = req.params.usn;
    try {
      const results = await db
        .select()
        .from(interview)
        .where(eq(interview.usn, usn));
      res.status(200).json({ data: results });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    }
  }

  async getCompanies(req: Request, res: Response) {
    try {
      const results = await db.select().from(company);
      res.status(200).json({ data: results });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    }
  }

  async ApplyForCompany(req: Request, res: Response) {
    const usn = req.body.usn;
    const cid = req.body.cid;

    try {
      const result = await db.insert(applications).values({
        usn: usn,
        compid: cid,
        status: "Applied",
      });
      res.status(200).json({ message: "Applied successfully" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    }
  }
}

export default new StudentController();
