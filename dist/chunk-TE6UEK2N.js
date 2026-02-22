import {
  tutorsController
} from "./chunk-S6FTO6YJ.js";
import {
  authMiddleware_default
} from "./chunk-RJPOOT2T.js";

// src/modules/tutors/tutor.route.ts
import express from "express";
var router = express.Router();
router.post(
  "/",
  authMiddleware_default("TUTOR" /* TUTOR */),
  tutorsController.createTutorProfile
);
router.get("/", tutorsController.getAllTutors);
router.get(
  "/me",
  authMiddleware_default("TUTOR" /* TUTOR */),
  tutorsController.getAllTutorProfilesController
);
router.get("/:id", authMiddleware_default(), tutorsController.getTutorProfileById);
router.put(
  "/profile",
  authMiddleware_default("TUTOR" /* TUTOR */),
  tutorsController.updateTutorProfile
);
router.put(
  "/availability",
  authMiddleware_default("TUTOR" /* TUTOR */),
  tutorsController.setAvailability
);
var tutorRouter = router;

export {
  tutorRouter
};
