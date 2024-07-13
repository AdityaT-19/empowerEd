import { Router, type Request, type Response } from "express";
import studentrouter from "./StudentRouter";
import parentrouter from "./ParentRouter";
import placementcoordinatorrouter from "./PlacementCoordinatorRouter";
import adminrouter from "./AdminRouter";
import teacherrouter from "./TeacherRouter";

const router = Router();

router.use("/student", studentrouter);
router.use("/parent", parentrouter);
router.use("/placement", placementcoordinatorrouter);
router.use("/admin", adminrouter);
router.use("/teacher", teacherrouter);

export default router;
