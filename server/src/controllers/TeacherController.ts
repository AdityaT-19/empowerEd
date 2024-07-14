import { type Response, type Request } from "express";
import db from "../utils/DataSource";
import {
  teacher,
  attendance,
  studCourse,
  courses,
  teachCourse,
  students,
} from "../models";
import { eq, and } from "drizzle-orm";
class TeacherController {
  async getTeacherById(req: Request, res: Response) {
    try {
      const teacherId = req.params.id;
      const result = await db
        .select()
        .from(teacher)
        .where(eq(teacher.tid, teacherId));
      res.json({ data: result });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    }
  }

  async getCourses(req: Request, res: Response) {
    try {
      const teacherId = req.params.id;
      const result = await db
        .select()
        .from(teachCourse)
        .where(eq(teachCourse.tid, teacherId));

      res.status(200).json({ data: result });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    }
  }

  async fetchStudentList(req: Request, res: Response) {
    try {
      const teacher_course = req.body;
      const courseDetails = await db
        .select()
        .from(courses)
        .where(eq(courses.cid, teacher_course.cid));
      const result = await db
        .select()
        .from(students)
        .where(
          and(
            eq(students.sem, courseDetails[0].semester),
            eq(students.section, teacher_course.section)
          )
        );
      res.status(200).json({ data: result });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something Went Wrong!" });
    }
  }

  async fetchStudentCie(req:Request,res:Response){
    try {
      const teacher_course = req.body;
      const courseDetails = await db
    .select()
    .from(courses)
    .where(eq(courses.cid, teacher_course.cid));

  if (courseDetails.length === 0) {
    return res.status(404).json({ error: "Course not found" });
  }

  const course = courseDetails[0];

  // Fetch student data related to the specific course
  const studentsResult = await db
        .select()
        .from(students)
        .fullJoin(studCourse, eq(studCourse.usn, students.usn))
        .where(
          and(
            eq(studCourse.cid, teacher_course.cid),
            eq(students.sem, course.semester),
            eq(students.section, teacher_course.section)
          )
        );

      let response=[];
      for(let i=0;i<studentsResult.length;i++){
        if(studentsResult[i].students&&studentsResult[i].stud_course){
        let newObj={
          "usn":studentsResult[i].students?.usn,
          "name":studentsResult[i].students?.name,
          "sem":studentsResult[i].students?.sem,
          "section":studentsResult[i].students?.section,
          "ia1":studentsResult[i].stud_course?.ia1,
          "ia2":studentsResult[i].stud_course?.ia2,
          "ia3":studentsResult[i].stud_course?.ia3
        };
        response.push(newObj);
      }
      }
       
      res.status(200).json({ data: response });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something Went Wrong!" });
    }
  }

  async markAttendance(req: Request, res: Response) {
    try {
      const { teacher_course, studentList } = req.body;
      for (let i = 0; i < studentList.length; i++) {
        let model: any = {
          usn: studentList[i]["usn"],
          cid: teacher_course.cid,
          date: studentList[i]["date"],
          hour: studentList[i]["hour"],
          present: studentList[i]["present"],
        };

        await db.insert(attendance).values(model);
        const usn = studentList[i]["usn"];
        const courseId = teacher_course.cid;
        const totalCount = await db
          .select()
          .from(attendance)
          .where(and(eq(attendance.usn, usn), eq(attendance.cid, courseId)));

        const presentCount = await db
          .select()
          .from(attendance)
          .where(
            and(
              eq(attendance.usn, usn),
              eq(attendance.cid, courseId),
              eq(attendance.present, true)
            )
          );

        let percentage = 0;
        if (totalCount.length > 0) {
          percentage = (presentCount.length / totalCount.length) * 100;
        }

        await db
          .update(studCourse)
          .set({ attPer: percentage }) // Fixed to 2 decimal places for precision
          .where(and(eq(studCourse.usn, usn), eq(studCourse.cid, courseId)));
      }
      res.status(201).json({ message: "Attendance Marked Sucessfully." });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something Went Wrong!" });
    }
  }

  async updateMarks(req: Request, res: Response) {
    try {
      const { cid, usn, ia1, ia2, ia3 } = req.body;
      const result = await db
        .update(studCourse)
        .set({ ia1, ia2, ia3 })
        .where(and(eq(studCourse.cid, cid), eq(studCourse.usn, usn)));
      res.status(201).json({ message: "Updation Sucessful." });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something Went Wrong!" });
    }
  }

  async massUpdateMarks(req: Request, res: Response) {
    try {
      const { allInOneFile } = req.body;
      for (let i = 0; i < allInOneFile.length; i++) {
        let { cid, usn, ia1, ia2, ia3 } = allInOneFile[i];
        const result = await db
          .update(studCourse)
          .set({ ia1, ia2, ia3 })
          .where(and(eq(studCourse.cid, cid), eq(studCourse.usn, usn)));
      }
      res.status(201).json({ message: "File updation Sucessful!" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went Wrong!" });
    }
  }
  /**
   * Update student counselling reports and achivements
   */
  async updateStudentReports(req: Request, res: Response) {
    try {
      const { usn, counsel_rep, achievements } = req.body;
      const result = await db
        .select()
        .from(students)
        .where(eq(students.usn, usn));
      if (!result) {
        throw new Error("Non exsistant student.");
      }
      const updatedResult = await db
        .update(students)
        .set({ counsel_rep, achievements })
        .where(eq(students.usn, usn));
      console.log(updatedResult);
      res.status(201).json({ message: "Updation Sucessful" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went Wrong!" });
    }
  }
  /**
   * get StudentReports by id
   */
  async getStudentReports(req: Request, res: Response) {
    try {
      const usn = req.params.usn;
      const result = await db
        .select({
          counsel_rep: students.counsel_rep,
          achievements: students.achievements,
        })
        .from(students)
        .where(eq(students.usn, usn));
      res.status(200).json({ data: result });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    }
  }
}

export default new TeacherController();
