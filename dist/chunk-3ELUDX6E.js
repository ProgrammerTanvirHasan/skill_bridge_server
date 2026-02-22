import {
  reviewController
} from "./chunk-COFLIZFR.js";
import {
  auth_default
} from "./chunk-3EAPRASJ.js";

// src/modules/review/review.route.ts
import express from "express";
var router = express.Router();
router.post("/", auth_default("STUDENT" /* STUDENT */), reviewController.createReview);
router.get("/", auth_default("TUTOR" /* TUTOR */), reviewController.getMyReviews);
var reviewRouter = router;

export {
  reviewRouter
};
