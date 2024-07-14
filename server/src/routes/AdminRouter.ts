import { Router } from "express";
import { AdminController } from "../controllers";

const router = Router();

/**
 * All Admin routes here
 */

router.get("/courses", AdminController.getAllCourses);

router.get("/getAllTeachers", AdminController.getAllTeachers);

router.get("/getAllStudents", AdminController.getAllStudents);

router.post("/createCourses", AdminController.createCourses);

router.post(
  "/createStudentParentEnroll",
  AdminController.createStudentParentAndEnroll
);

router.post(
  "/massCreateStudentParentAndEnroll",
  AdminController.massCreateStudentParentAndEnroll
);

router.post("/addAdditionalCourses", AdminController.addAdditionalCourses);

router.post("/addPlacementCoodinator", AdminController.addPlacementCoodinator);

router.post("/sendMailToTeacher",AdminController.sendEmailConformationToTeachers)

router.post("/sendMailToParent",AdminController.sendEmailConformationToParents)

router.post("/sendMailToStudent",AdminController.sendEmailConformationToStudents)

router.patch(
  "/updateGradeStudentAndCid",
  AdminController.updateGradeStudentAndCid
);

router.patch(
  "/massUpdateGradeStudentAndCid",
  AdminController.massUpdateGradeStudentAndCid
);
router.get(
  "/getPlacementCoordinators",
  AdminController.getPlacementCoordinators
);
router.put("/updateStudent", AdminController.updateStudent);

router.delete("/dropCourses", AdminController.dropCourses);

router.delete(
  "/deletePlacementCoodinator/:id",
  AdminController.deletePlacementCoodinator
);
router.post("/teachCourse", AdminController.createTeacherCourseRelationship);

router.post("/createTeacher", AdminController.createTeacher);

export default router;
