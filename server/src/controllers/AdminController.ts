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
import contactEmail from "../utils/MailService";

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
      res.status(400).json({ e });
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

  async sendEmailConformationToTeachers(req:Request,res:Response){
    try{
      const {teacherName,email,password}=req.body;
      const mailHtml = `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Registration Confirmation</title>
              <style>
                /* Reset default styles */
                body,
                h1,
                p {
                  margin: 0;
                  padding: 0;
                }
                body {
                  font-family: "Helvetica Neue", Arial, sans-serif;
                  line-height: 1.6;
                  background-color: #f2f2f2;
                  padding: 20px;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #fff;
                  padding: 30px;
                  border-radius: 10px;
                  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                }
                .header {
                  text-align: center;
                  margin-bottom: 30px;
                }
                .header img {
                  max-width: 100%;
                  height: auto;
                  border-radius: 10px;
                }
                h1 {
                  color: #673ab7;
                  text-align: center;
                  font-size: 24px;
                  margin-bottom: 20px;
                }
                p {
                  color: #555;
                  font-size: 16px;
                  margin-bottom: 20px;
                }
                ul {
                  list-style-type: none;
                  padding: 0;
                }
                li {
                  margin-bottom: 10px;
                }
                .button {
                  display: inline-block;
                  background-color: #673ab7;
                  color: #fff;
                  text-decoration: none;
                  padding: 10px 20px;
                  border-radius: 5px;
                  margin-top: 20px;
                  text-align: center;
                }
                .button:hover {
                  background-color: #5a2f99;
                }
                .footer {
                  text-align: center;
                  margin-top: 30px;
                  color: #888;
                  font-size: 12px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <img src="https://firebasestorage.googleapis.com/v0/b/empowered-ed9ae.appspot.com/o/logo.png?alt=media&token=9bab3fc6-ede0-4dff-aae3-1b46447ca56f" alt="Welcome to EmpowerEd" />
                </div>
                <h1>Welcome to EmpowerEd!</h1>
                <p>Dear ${teacherName},</p>
                <p>
                  We are thrilled to welcome you to <strong>EmpowerEd</strong>. You have
                  successfully registered as a teacher on our platform. You can now access
                  a wide array of resources and tools to enhance your teaching experience
                  and connect with your students.
                </p>
                <p>Please make a note of your login credentials:</p>
                <ul>
                  <li>Email: <strong>${email}</strong></li>
                  <li>Password: <strong>${password}</strong></li>
                </ul>
                <p>
                  Make sure you change your password after logging in for the first time.
                </p>
                <p>
                  Should you have any questions or need assistance, please feel free to
                  contact us.
                </p>
                <p class="footer">Best regards,<br />EmpowerEd Team</p>
              </div>
            </body>
          </html>
          
          `;

          const mail = {
            to: email,
            subject: "empowerEd - Teacher Registration Sucessful",
            html: mailHtml,
          };
          // Send mail
          contactEmail.sendMail(mail, (err, info) => {
            if (err) {
              console.log(err);
              throw new Error("Something went wrong");
            } else {
              res.status(201).json({
                message: "Mail Sent",
              });
            }
          });
    }catch(e){
      console.log(e)
      res.status(400).json({message:"Something Went Wrong!"})
    }
  }
  async sendEmailConformationToParents(req:Request,res:Response){
    try{
      const {parentName,email,password}=req.body;
      const mailHtml = `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Registration Confirmation</title>
              <style>
                /* Reset default styles */
                body,
                h1,
                p {
                  margin: 0;
                  padding: 0;
                }
                body {
                  font-family: "Helvetica Neue", Arial, sans-serif;
                  line-height: 1.6;
                  background-color: #f2f2f2;
                  padding: 20px;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #fff;
                  padding: 30px;
                  border-radius: 10px;
                  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                }
                .header {
                  text-align: center;
                  margin-bottom: 30px;
                }
                .header img {
                  max-width: 100%;
                  height: auto;
                  border-radius: 10px;
                }
                h1 {
                  color: #673ab7;
                  text-align: center;
                  font-size: 24px;
                  margin-bottom: 20px;
                }
                p {
                  color: #555;
                  font-size: 16px;
                  margin-bottom: 20px;
                }
                ul {
                  list-style-type: none;
                  padding: 0;
                }
                li {
                  margin-bottom: 10px;
                }
                .button {
                  display: inline-block;
                  background-color: #673ab7;
                  color: #fff;
                  text-decoration: none;
                  padding: 10px 20px;
                  border-radius: 5px;
                  margin-top: 20px;
                  text-align: center;
                }
                .button:hover {
                  background-color: #5a2f99;
                }
                .footer {
                  text-align: center;
                  margin-top: 30px;
                  color: #888;
                  font-size: 12px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <img src="https://firebasestorage.googleapis.com/v0/b/empowered-ed9ae.appspot.com/o/logo.png?alt=media&token=9bab3fc6-ede0-4dff-aae3-1b46447ca56f" alt="Welcome to EmpowerEd" />
                </div>
                <h1>Welcome to EmpowerEd!</h1>
                <p>Dear ${parentName},</p>
                <p>
                  We are delighted to welcome you to <strong>EmpowerEd</strong>. You have
                  successfully registered as a parent on our platform. You can now stay
                  updated on your child's academic progress and access valuable resources
                  to support their educational journey.
                </p>
                <p>Please make a note of your login credentials:</p>
                <ul>
                  <li>Email: <strong>${email}</strong></li>
                  <li>Password: <strong>${password}</strong></li>
                </ul>
                <p>
                  Make sure you change your password after logging in for the first time.
                </p>
                <p>
                  Should you have any questions or need assistance, please feel free to
                  contact us.
                </p>
                <p class="footer">Best regards,<br />EmpowerEd Team</p>
              </div>
            </body>
          </html>
          
          `;

          const mail = {
            to: email,
            subject: "empowerEd - Parent Registration Sucessful",
            html: mailHtml,
          };
          // Send mail
          contactEmail.sendMail(mail, (err, info) => {
            if (err) {
              console.log(err);
              throw new Error("Something went wrong");
            } else {
              res.status(201).json({
                message: "Mail Sent",
              });
            }
          });
    }catch(e){
      console.log(e)
      res.status(400).json({message:"Something Went Wrong!"})
    }
  }
  async sendEmailConformationToStudents(req:Request,res:Response){
    try{
      const {studentName,email,password}=req.body;
      const mailHtml = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Registration Confirmation</title>
            <style>
              /* Reset default styles */
              body,
              h1,
              p {
                margin: 0;

                padding: 0;
              }
              body {
                font-family: "Helvetica Neue", Arial, sans-serif;
                line-height: 1.6;
                background-color: #f2f2f2;
                padding: 20px;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
              }
              .header img {
                max-width: 100%;
                height: auto;
                border-radius: 10px;
              }
              h1 {
                color: #673ab7;
                text-align: center;
                font-size: 24px;
                margin-bottom: 20px;
              }
              p {
                color: #555;
                font-size: 16px;
                margin-bottom: 20px;
              }
              ul {
                list-style-type: none;
                padding: 0;
              }
              li {
                margin-bottom: 10px;
              }
              .button {
                display: inline-block;
                background-color: #673ab7;
                color: #fff;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 5px;
                margin-top: 20px;
                text-align: center;
              }
              .button:hover {
                background-color: #5a2f99;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                color: #888;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="https://firebasestorage.googleapis.com/v0/b/empowered-ed9ae.appspot.com/o/logo.png?alt=media&token=9bab3fc6-ede0-4dff-aae3-1b46447ca56f" alt="Welcome to EmpowerEd" />
              </div>
              <h1>Welcome to EmpowerEd!</h1>
              <p>Dear ${studentName},</p>
              <p>
                We are delighted to inform you that you have successfully registered on
                our platform <strong>EmpowerEd</strong>. You can now access a wealth of
                resources and services tailored to support your academic journey and
                career.
              </p>
              <p>Please make a note of your login credentials:</p>
              <ul>
                <li>Email: <strong>${email}</strong></li>
                <li>Password: <strong>${password}</strong></li>
              </ul>
              <p>
                Make sure you change your password after logging in for the first time.
              </p>
              <p>
                Should you have any questions or need assistance, please feel free to
                contact us.
              </p>
              <p class="footer">Best regards,<br />EmpowerEd Team</p>
            </div>
          </body>
        </html>
          
          `;

          const mail = {
            to: email,
            subject: "empowerEd - Student Registration Sucessful",
            html: mailHtml,
          };
          // Send mail
          contactEmail.sendMail(mail, (err, info) => {
            if (err) {
              console.log(err);
              throw new Error("Something went wrong");
            } else {
              res.status(201).json({
                message: "Mail Sent",
              });
            }
          });
    }catch(e){
      console.log(e)
      res.status(400).json({message:"Something Went Wrong!"})
    }
  }
  async sendEmailConformationToPlacementCoordinator(req:Request,res:Response){
    try{
      const {usn}=req.body;
      const result=await db.select().from(students).where(eq(students.usn,usn));
      const email=result[0].email;
      console.log(email)
      const mailHtml = `
        <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Registration Confirmation</title>
              <style>
                /* Reset default styles */
                body,
                h1,
                p {
                  margin: 0;
                  padding: 0;
                }
                body {
                  font-family: "Helvetica Neue", Arial, sans-serif;
                  line-height: 1.6;
                  background-color: #f2f2f2;
                  padding: 20px;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #fff;
                  padding: 30px;
                  border-radius: 10px;
                  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                }
                .header {
                  text-align: center;
                  margin-bottom: 30px;
                }
                .header img {
                  max-width: 100%;
                  height: auto;
                  border-radius: 10px;
                }
                h1 {
                  color: #673ab7;
                  text-align: center;
                  font-size: 24px;
                  margin-bottom: 20px;
                }
                p {
                  color: #555;
                  font-size: 16px;
                  margin-bottom: 20px;
                }
                ul {
                  list-style-type: none;
                  padding: 0;
                }
                li {
                  margin-bottom: 10px;
                }
                .button {
                  display: inline-block;
                  background-color: #673ab7;
                  color: #fff;
                  text-decoration: none;
                  padding: 10px 20px;
                  border-radius: 5px;
                  margin-top: 20px;
                  text-align: center;
                }
                .button:hover {
                  background-color: #5a2f99;
                }
                .footer {
                  text-align: center;
                  margin-top: 30px;
                  color: #888;
                  font-size: 12px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <img src="./logo.png" alt="Welcome to EmpowerEd" />
                </div>
                <h1>Congratulations and Welcome to EmpowerEd!</h1>
                <p>Dear Student,</p>
                <p>
                  We are thrilled to inform you that you have been selected as a Placement
                  Coordinator for our platform <strong>EmpowerEd</strong>. You have
                  successfully registered and can now begin your role in helping your
                  peers connect with potential employers.
                </p>
                  Should you have any questions or need assistance, please feel free to
                  contact us.
                </p>
                <p class="footer">Best regards,<br />EmpowerEd Team</p>
              </div>
            </body>
          </html>
          
          `;

          const mail = {
            to: email,
            subject: "empowerEd - Placement Coordinator Registration Sucessful",
            html: mailHtml,
          };
          // Send mail
          contactEmail.sendMail(mail, (err, info) => {
            if (err) {
              console.log(err);
              throw new Error("Something went wrong");
            } else {
              res.status(201).json({
                message: "Mail Sent",
              });
            }
          });
    }catch(e){
      console.log(e)
      res.status(400).json({message:"Something Went Wrong!"})
    }
  }
}

export default new AdminController();
