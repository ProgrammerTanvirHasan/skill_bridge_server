import {
  tutorsController
} from "./chunk-S6FTO6YJ.js";
import {
  auth_default
} from "./chunk-3EAPRASJ.js";

// src/modules/tutors/tutor.route.ts
import express from "express";
var router = express.Router();
router.post(
  "/",
  auth_default("TUTOR" /* TUTOR */),
  tutorsController.createTutorProfile
);
router.get("/", tutorsController.getAllTutors);
router.get(
  "/me",
  auth_default("TUTOR" /* TUTOR */),
  tutorsController.getAllTutorProfilesController
);
router.get("/:id", auth_default(), tutorsController.getTutorProfileById);
router.put(
  "/profile",
  auth_default("TUTOR" /* TUTOR */),
  tutorsController.updateTutorProfile
);
router.put(
  "/availability",
  auth_default("TUTOR" /* TUTOR */),
  tutorsController.setAvailability
);
var tutorRouter = router;

export {
  tutorRouter
};
