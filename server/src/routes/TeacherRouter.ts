import { Router } from "express";
import { TeacherController } from "../controllers";

const router = Router();

router.get("/", TeacherController.getCourses);
router.get("/:id", TeacherController.getTeacherById);
router.get("/studentReports/:usn", TeacherController.getStudentReports);

router.post("/fetchStudentList", TeacherController.fetchStudentList);
router.post("/markAttendance", TeacherController.markAttendence);

router.patch("/updateMarks", TeacherController.updateMarks);
router.patch("/massUpdateMarks", TeacherController.massUpdateMarks);

router.patch("/updateStudentReports", TeacherController.updateStudentReports);

export default router;
