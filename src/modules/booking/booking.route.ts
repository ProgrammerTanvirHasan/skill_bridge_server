import express from "express";
import middleware, { userRole } from "../../middleware/auth";
import { bookingController } from "./booking.controller";

const router = express.Router();
router.post("/", middleware(userRole.STUDENT), bookingController.createBooking);
router.get(
  "/tutor/me",
  middleware(userRole.TUTOR, userRole.STUDENT),
  bookingController.getBookings,
);
router.get(
  "/:id",
  middleware(userRole.TUTOR, userRole.STUDENT),
  bookingController.getBookingById,
);
router.patch(
  "/:id/status",
  middleware(userRole.TUTOR),
  bookingController.updateBookingStatus,
);

export const bookingRouter = router;
