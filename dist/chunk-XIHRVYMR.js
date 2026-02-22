import {
  bookingController
} from "./chunk-462JVGUF.js";
import {
  authMiddleware_default
} from "./chunk-RJPOOT2T.js";

// src/modules/booking/booking.route.ts
import express from "express";
var router = express.Router();
router.post(
  "/",
  authMiddleware_default("STUDENT" /* STUDENT */),
  bookingController.createBooking
);
router.get(
  "/tutor/me",
  authMiddleware_default("TUTOR" /* TUTOR */, "STUDENT" /* STUDENT */),
  bookingController.getBookings
);
router.get(
  "/:id",
  authMiddleware_default("TUTOR" /* TUTOR */, "STUDENT" /* STUDENT */),
  bookingController.getBookingById
);
router.patch(
  "/:id/status",
  authMiddleware_default("TUTOR" /* TUTOR */),
  bookingController.updateBookingStatus
);
var bookingRouter = router;

export {
  bookingRouter
};
