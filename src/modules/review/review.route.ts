import express from "express";
import middleware, { userRole } from "../../middleware/auth";
import { reviewController } from "./review.controller";

const router = express.Router();
router.post("/", middleware(userRole.STUDENT), reviewController.createReview);

router.get("/", middleware(userRole.TUTOR), reviewController.getMyReviews);

export const reviewRouter = router;
