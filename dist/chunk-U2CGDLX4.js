import {
  bookingController
} from "./chunk-462JVGUF.js";
import {
  auth_default
} from "./chunk-3EAPRASJ.js";

// src/modules/booking/booking.route.ts
import express from "express";
var router = express.Router();
router.post("/", auth_default("STUDENT" /* STUDENT */), bookingController.createBooking);
router.get(
  "/tutor/me",
  auth_default("TUTOR" /* TUTOR */, "STUDENT" /* STUDENT */),
  bookingController.getBookings
);
router.get(
  "/:id",
  auth_default("TUTOR" /* TUTOR */, "STUDENT" /* STUDENT */),
  bookingController.getBookingById
);
router.patch(
  "/:id/status",
  auth_default("TUTOR" /* TUTOR */),
  bookingController.updateBookingStatus
);
var bookingRouter = router;

export {
  bookingRouter
};
