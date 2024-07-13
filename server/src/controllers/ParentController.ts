import { type Response, type Request } from "express";
import db from "../utils/DataSource.js";
import { studCourse, courses, parent, students } from "../models";
import { eq } from "drizzle-orm";

class ParentController {
  /**
   * get Parent Getails after login/signup
   */
  async getParentsDetails(req: Request, res: Response) {
    try {
      const phNo = req.params.id;
      const result = await db
        .select()
        .from(parent)
        .where(eq(parent.phNo, phNo));
      res.status(201).json({ data: result });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    }
  }
  /**
   * This is an all in one route to extract all details
   */

  /**
   * Route to extract only marks of ia and grade
   */
  async getStudentsAttendanceAndMarks(req: Request, res: Response) {
    try {
      const usn = req.params.usn;
      const result = await db
        .select()
        .from(studCourse)
        .fullJoin(courses, eq(studCourse.cid, courses.cid))
        .where(eq(studCourse.usn, usn));
      const response = result.map((item) => {
        return {
          ...item.stud_course,
          ...item.courses,
        };
      });

      if (!result) {
        throw new Error("Something went Wrong!");
      }
      // Serialize response with custom BigInt handling

      res.status(200).json({ data: response });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Something Went Wrong!" });
    }
  }

  async getStudentsCounsellingReports(req: Request, res: Response) {
    try {
      const usn = req.params.usn;
      let result: any = await db
        .select({
          counsel_rep: students.counsel_rep,
        })
        .from(students)
        .where(eq(students.usn, usn));
      if (!result) {
        throw new Error("Something went Wrong!");
      }

      res.status(200).json({ data: result });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Something Went Wrong!" });
    }
  }
  /**
   * Get achivements Reports
   */
  async getStudentsCounsellingAchievements(req: Request, res: Response) {
    try {
      const usn = req.params.usn;
      let result: any = await db
        .select({
          achievements: students.achievements,
        })
        .from(students)
        .where(eq(students.usn, usn));
      if (!result) {
        throw new Error("Something went Wrong!");
      }

      res.status(200).json({ data: result });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Something Went Wrong!" });
    }
  }
}

export default new ParentController();
