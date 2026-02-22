import {
  bookingService
} from "./chunk-OB4NNRSQ.js";

// src/modules/booking/booking.controller.ts
var createBooking = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { tutorId, scheduledAt } = req.body;
    if (!tutorId || !scheduledAt) {
      return res.status(400).json({
        success: false,
        message: "tutorId and scheduledAt are required"
      });
    }
    const result = await bookingService.createBooking(user.id, {
      tutorId: Number(tutorId),
      scheduledAt: new Date(scheduledAt)
    });
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var getBookings = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const result = await bookingService.getBookingsByUser(user.id, user.role);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var getBookingById = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const id = Number(req.params.id);
    const result = await bookingService.getBookingById(id, user.id, user.role);
    if (!result) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var getMyBookings = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const tutorId = req.user.id;
    const bookings = await bookingService.getBookingsByTutorId(tutorId);
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    next(err);
  }
};
var updateBookingStatus = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const id = Number(req.params.id);
    const { status } = req.body;
    if (!["CONFIRMED", "COMPLETED", "CANCELLED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "status must be CONFIRMED, COMPLETED, or CANCELLED"
      });
    }
    const result = await bookingService.updateBookingStatus(
      id,
      status,
      user.id,
      user.role
    );
    if (!result) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var bookingController = {
  createBooking,
  getBookings,
  getMyBookings,
  getBookingById,
  updateBookingStatus
};

export {
  bookingController
};
