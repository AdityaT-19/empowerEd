import { Router } from "express";
import { StudentController } from "../controllers";

const router = Router();

router.get("/", StudentController.findAllStudents);

router.get("/getCompanies", StudentController.getCompanies);

router.get("/:usn", StudentController.findByUsn);

router.post("/", StudentController.createStudent);

router.put("/", StudentController.updateStudent);

router.get("/getCourses/:usn", StudentController.fetchCourses);

router.post("/predictCTC", StudentController.PredictCTC);

router.post("/getSlots/:usn", StudentController.GetSlots);

router.post("/applyForCompany", StudentController.ApplyForCompany);

export default router;
