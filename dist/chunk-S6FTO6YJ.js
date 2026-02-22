import {
  tutorsService
} from "./chunk-ITN5NGGE.js";

// src/modules/tutors/tutors.controller.ts
var createTutorProfile = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const body = req.body;
    const categoryIds = Array.isArray(body.categoryIds) ? body.categoryIds.map(Number) : [];
    const result = await tutorsService.createTutorProfile(user.id, {
      bio: body.bio,
      hourlyRate: body.hourlyRate,
      status: body.status,
      categoryIds
    });
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAllTutors = async (req, res, next) => {
  try {
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : void 0;
    const minRating = req.query.minRating ? Number(req.query.minRating) : void 0;
    const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : void 0;
    const filters = {};
    if (categoryId != null) filters.categoryId = categoryId;
    if (minRating != null) filters.minRating = minRating;
    if (maxPrice != null) filters.maxPrice = maxPrice;
    const result = await tutorsService.getAllTutors(filters);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getTutorProfileById = async (req, res, next) => {
  try {
    const tutorId = Number(req.params.id);
    if (Number.isNaN(tutorId)) {
      return res.status(400).json({ message: "Invalid tutor id" });
    }
    const result = await tutorsService.getTutorById(tutorId);
    if (!result) {
      return res.status(404).json({ message: "Tutor not found" });
    }
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};
var getAllTutorProfilesController = async (req, res, next) => {
  try {
    const profiles = await tutorsService.getAllTutorProfiles();
    res.status(200).json({ success: true, data: profiles });
  } catch (err) {
    next(err);
  }
};
var getMyTutorProfile = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const userId = req.user.id;
    const result = await tutorsService.getTutorByUserId(userId);
    if (!result) {
      return res.status(200).json({ success: true, data: null });
    }
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateTutorProfile = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const body = req.body;
    const categoryIds = Array.isArray(body.categoryIds) ? body.categoryIds.map(Number) : void 0;
    const result = await tutorsService.updateTutorProfile(user.id, {
      bio: body.bio,
      hourlyRate: body.hourlyRate,
      status: body.status,
      categoryIds
    });
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor profile not found"
      });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var setAvailability = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const slots = req.body.slots;
    if (!Array.isArray(slots)) {
      return res.status(400).json({
        success: false,
        message: "slots array is required"
      });
    }
    const result = await tutorsService.setAvailability(user.id, slots);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor profile not found"
      });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var tutorsController = {
  createTutorProfile,
  getAllTutors,
  getAllTutorProfilesController,
  getTutorProfileById,
  getMyTutorProfile,
  updateTutorProfile,
  setAvailability
};

export {
  tutorsController
};
