import express from "express";

import { tutorsController } from "./tutors.controller";
import authMiddleware, { userRole } from "../../middleware/authMiddleware";
console.log(authMiddleware, userRole, "ttttttttttt");

const router = express.Router();

router.post(
  "/",
  authMiddleware(userRole.TUTOR),
  tutorsController.createTutorProfile,
);

router.get("/", tutorsController.getAllTutors);

router.get(
  "/me",
  authMiddleware(userRole.TUTOR),
  tutorsController.getAllTutorProfilesController,
);
router.get("/:id", authMiddleware(), tutorsController.getTutorProfileById);

router.put(
  "/profile",
  authMiddleware(userRole.TUTOR),
  tutorsController.updateTutorProfile,
);
router.put(
  "/availability",
  authMiddleware(userRole.TUTOR),
  tutorsController.setAvailability,
);

export const tutorRouter = router;
