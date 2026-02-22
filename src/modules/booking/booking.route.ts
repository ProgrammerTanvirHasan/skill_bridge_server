import express from "express";

import { bookingController } from "./booking.controller";
import authMiddleware, { userRole } from "../../middleware/authMiddleware";

const router = express.Router();
router.post(
  "/",
  authMiddleware(userRole.STUDENT),
  bookingController.createBooking,
);
router.get(
  "/tutor/me",
  authMiddleware(userRole.TUTOR, userRole.STUDENT),
  bookingController.getBookings,
);
router.get(
  "/:id",
  authMiddleware(userRole.TUTOR, userRole.STUDENT),
  bookingController.getBookingById,
);
router.patch(
  "/:id/status",
  authMiddleware(userRole.TUTOR),
  bookingController.updateBookingStatus,
);

export const bookingRouter = router;
