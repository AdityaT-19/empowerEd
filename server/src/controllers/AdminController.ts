import { type Response, type Request } from "express";
import {
  courses,
  students,
  studCourse,
  parent,
  place_cord,
  teachCourse,
  teacher,
} from "../models";
import db from "../utils/DataSource";
import { eq, and, or } from "drizzle-orm";

class AdminController {
  async createCourses(req: Request, res: Response) {
    try {
      const newCourse = req.body;
      const result = await db.insert(courses).values(newCourse);
      res.status(201).json({ message: "Courses Sucessfully Created." });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something Went Wrong!" });
    }
  }

  /**
   * This is the function that enrols the student and maps it to parent
   * and courses we select all the coures of particular department.
   * Also there might be a question on how we will map when there are scheme changes
   * for that we can use start with 20,18 this is vtu standard.
   */
  async createStudentParentAndEnroll(req: Request, res: Response) {
    try {
      const { student, parents, scheme } = req.body;
      const studResult = await db.insert(students).values(student);
      const parentResult = await db.insert(parent).values(parents);

      /**
       * So the next query regiesters the student to all the courses that is offered by the dept
       * also 1,2 sem since its common in almost all clg.
       * We should next handle the scheme part we will work on it.
       */
      let eligibleCourses = await db
        .select()
        .from(courses)
        .where(
          or(
            eq(student.dept, courses.dept),
            eq(courses.semester, 1),
            eq(courses.semester, 2)
          )
        );
      for (let i = 0; i < eligibleCourses.length; i++) {
        let newEnrollement = {
          cid: eligibleCourses[i].cid,
          usn: student.usn,
          ia1: 0,
          ia2: 0,
          ia3: 0,
          grade: "",
          attPer: 0,
        };
        await db.insert(studCourse).values(newEnrollement);
      }
      res.status(201).json({
        message: "Student Enrollement Sucessful,Parent Mapping sucessful.",
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    }
  }

  /**
   * This is the new feature where we will take input of excel sheet apply pre processing
   * from flask/fast api server will use python request library to send the mass updating option
   */
  async massCreateStudentParentAndEnroll(req: Request, res: Response) {
    try {
      const { studentAndParents } = req.body;
      for (let j = 0; j < studentAndParents.length; j++) {
        const studResult = await db
          .insert(students)
          .values(studentAndParents[j]["student"]);
        const parentResult = await db
          .insert(parent)
          .values(studentAndParents[j]["parents"]);

        /**
         * So the next query regiesters the student to all the courses that is offered by the dept
         * also 1,2 sem since its common in almost all clg.
         * We should next handle the scheme part we will work on it.
         */
        let eligibleCourses = await db
          .selectDistinct()
          .from(courses)
          .where(
            or(
              eq(studentAndParents[j]["student"].dept, courses.dept),
              eq(courses.semester, 1),
              eq(courses.semester, 2)
            )
          );

        for (let i = 0; i < eligibleCourses.length; i++) {
          let newEnrollement = {
            cid: eligibleCourses[i].cid,
            usn: studentAndParents[j]["student"].usn,
            ia1: 0,
            ia2: 0,
            ia3: 0,
            grade: "",
            attPer: 0,
          };

          await db.insert(studCourse).values(newEnrollement);
        }
        res.status(201).json({ message: "Mass Insertion Sucessful" });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went Wrong!" });
    }
  }

  async addAdditionalCourses(req: Request, res: Response) {
    try {
      const { student, course } = req.body;
      let newEnrollement = {
        cid: course.cid,
        usn: student.usn,
        ia1: 0,
        ia2: 0,
        ia3: 0,
        grade: "",
        attPer: 0,
      };
      let result = await db.insert(studCourse).values(newEnrollement);
      res.status(201).json({ message: "Insertion Sucessfull" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    }
  }

  async dropCourses(req: Request, res: Response) {
    try {
      const { usn, cid } = req.body;

      let result = await db
        .delete(studCourse)
        .where(and(eq(studCourse.cid, cid), eq(studCourse.usn, usn)));
      res.status(201).json({ message: "Deletion Sucessfull" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    }
  }

  async getAllCourses(req: Request, res: Response) {
    try {
      let result = await db.select().from(courses);
      res.status(200).json({ data: result });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    }
  }

  async addPlacementCoodinator(req: Request, res: Response) {
    try {
      const { usn } = req.body;
      let newPS: any = {
        usn: usn,
      };
      const result = await db.insert(place_cord).values(newPS);
      res.status(201).json({ message: "Sucessful insertion." });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went wrong" });
    }
  }

  async deletePlacementCoodinator(req: Request, res: Response) {
    try {
      const usn = req.params.id;
      const result = await db.delete(place_cord).where(eq(place_cord.usn, usn));
      res.status(201).json({ message: "Sucessful deletion." });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went wrong" });
    }
  }
  async createTeacherCourseRelationship(req: Request, res: Response) {
    try {
      const { tid, cid, section } = req.body;
      let newTechCourseRelationship: any = {
        tid,
        cid,
        section,
      };
      const result = await db
        .insert(teachCourse)
        .values(newTechCourseRelationship);
      res.status(201).json({ message: "Creation Sucessful" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went wrong!" });
    }
  }

  async updateGradeStudentAndCid(req: Request, res: Response) {
    try {
      const { usn, cid, grade } = req.body;
      let tempStudent = await db
        .update(studCourse)
        .set({ grade })
        .where(and(eq(studCourse.usn, usn), eq(studCourse.cid, cid)));
      res.status(201).json({ message: "Sucessful updation" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went Wrong!" });
    }
  }

  async massUpdateGradeStudentAndCid(req: Request, res: Response) {
    try {
      const { usnGradeandCie } = req.body;
      for (let i = 0; i < usnGradeandCie.length; i++) {
        let tempStudent = await db
          .update(studCourse)
          .set({ grade: usnGradeandCie[i]["grade"] })
          .where(
            and(
              eq(studCourse.usn, usnGradeandCie[i]["usn"]),
              eq(studCourse.cid, usnGradeandCie[i]["cid"])
            )
          );
      }
      res.status(201).json({ message: "Sucessful updation" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something went Wrong!" });
    }
  }
  /**
   * Updation of student
   */
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

  async createTeacher(req: Request, res: Response) {
    try {
      const newteacher = req.body;
      const result = await db.insert(teacher).values(newteacher);
      res.status(201).json({ message: "Created Teacher Sucessfully" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something Went Wrong!" });
    }
  }

  async getAllTeachers(req: Request, res: Response) {
    try {
      let result = await db.select().from(teacher);
      res.status(200).json({ data: result });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something Went Wrong!" });
    }
  }

  async getAllStudents(req: Request, res: Response) {
    try {
      let result = await db.select().from(students);
      res.status(200).json({ data: result });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something Went Wrong!" });
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

export default new AdminController();
