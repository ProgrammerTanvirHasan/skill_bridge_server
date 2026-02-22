import {
  reviewController
} from "./chunk-COFLIZFR.js";
import {
  authMiddleware_default
} from "./chunk-RJPOOT2T.js";

// src/modules/review/review.route.ts
import express from "express";
var router = express.Router();
router.post(
  "/",
  authMiddleware_default("STUDENT" /* STUDENT */),
  reviewController.createReview
);
router.get("/", authMiddleware_default("TUTOR" /* TUTOR */), reviewController.getMyReviews);
var reviewRouter = router;

export {
  reviewRouter
};
