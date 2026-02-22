import {
  reviewService
} from "./chunk-W7L6N5X7.js";

// src/modules/review/review.controller.ts
var createReview = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { tutorId, bookingId, rating, comment } = req.body;
    if (!tutorId || rating == null) {
      return res.status(400).json({
        success: false,
        message: "tutorId and rating are required"
      });
    }
    const input = {
      tutorId: Number(tutorId),
      rating: Number(rating)
    };
    if (bookingId != null) input.bookingId = Number(bookingId);
    if (comment != null) input.comment = comment;
    const result = await reviewService.createReview(user.id, input);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create review";
    if (message.includes("already reviewed") || message.includes("Invalid or incomplete")) {
      return res.status(400).json({ success: false, message });
    }
    next(error);
  }
};
var getMyReviews = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const reviews = await reviewService.getReviewsForTutor(user.id);
    res.json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
};
var reviewController = {
  createReview,
  getMyReviews
};

export {
  reviewController
};
