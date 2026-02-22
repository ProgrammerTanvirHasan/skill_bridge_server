import express from "express";

import { reviewController } from "./review.controller";
import authMiddleware, { userRole } from "../../middleware/authMiddleware";

const router = express.Router();
router.post(
  "/",
  authMiddleware(userRole.STUDENT),
  reviewController.createReview,
);

router.get("/", authMiddleware(userRole.TUTOR), reviewController.getMyReviews);

export const reviewRouter = router;
