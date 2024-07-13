import { Router } from "express";
import { ParentController } from "../controllers";
const router = Router();

/**
 * Routes for parent
 */
router.get(
  "/getStudentsMarksAndAttendance/:usn",
  ParentController.getStudentsAttendanceAndMarks
);

router.get("/getParentDetails/:id", ParentController.getParentsDetails);

router.get(
  "/getCounsellingReports/:usn",
  ParentController.getStudentsCounsellingReports
);

router.get(
  "/getAchievements/:usn",
  ParentController.getStudentsCounsellingAchievements
);

export default router;
