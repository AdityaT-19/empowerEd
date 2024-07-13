import { Router, type Request, type Response } from "express";
import { PlacementCoodinatorController } from "../controllers";

const router = Router();

/**
 * All routes for placement coordinator
 */
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Working" });
});

router.get(
  "/getPlacementCoordinators",
  PlacementCoodinatorController.getPlacementCoordinators
);
router.post("/addCompany", PlacementCoodinatorController.addCompany);
router.post("/bookSlot", PlacementCoodinatorController.BookSlot);
router.get("/getCompanies", PlacementCoodinatorController.getCompanies);
router.delete("/cancelSlot/:id", PlacementCoodinatorController.cancelSlot);
router.patch("/updateSlot/:id", PlacementCoodinatorController.updateSlot);
router.get(
  "/getSlots/:compid",
  PlacementCoodinatorController.getSlotsByCompany
);
router.get(
  "/getStudentsByCompany/:compid",
  PlacementCoodinatorController.getStudentsByAppliedCompany
);

export default router;
