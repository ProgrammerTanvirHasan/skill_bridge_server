import type { NextFunction, Request, Response } from "express";
import { tutorsService } from "./tutors.service";

const createTutorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const body = req.body;

    const categoryIds = Array.isArray(body.categoryIds)
      ? body.categoryIds.map(Number)
      : [];

    const result = await tutorsService.createTutorProfile(user.id as string, {
      bio: body.bio,
      hourlyRate: body.hourlyRate,
      status: body.status,
      categoryIds,
    });

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTutors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryId = req.query.categoryId
      ? Number(req.query.categoryId)
      : undefined;
    const minRating = req.query.minRating
      ? Number(req.query.minRating)
      : undefined;
    const maxPrice = req.query.maxPrice
      ? Number(req.query.maxPrice)
      : undefined;
    const filters: Parameters<typeof tutorsService.getAllTutors>[0] = {};
    if (categoryId != null) filters.categoryId = categoryId;
    if (minRating != null) filters.minRating = minRating;
    if (maxPrice != null) filters.maxPrice = maxPrice;
    const result = await tutorsService.getAllTutors(filters);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getTutorProfileById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
const getAllTutorProfilesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const profiles = await tutorsService.getAllTutorProfiles();
    res.status(200).json({ success: true, data: profiles });
  } catch (err) {
    next(err);
  }
};

const getMyTutorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateTutorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const body = req.body;
    const categoryIds = Array.isArray(body.categoryIds)
      ? body.categoryIds.map(Number)
      : undefined;
    const result = await tutorsService.updateTutorProfile(user.id, {
      bio: body.bio,
      hourlyRate: body.hourlyRate,
      status: body.status,
      categoryIds,
    });
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor profile not found",
      });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const setAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const slots = req.body.slots;
    if (!Array.isArray(slots)) {
      return res.status(400).json({
        success: false,
        message: "slots array is required",
      });
    }
    const result = await tutorsService.setAvailability(user.id, slots);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Tutor profile not found",
      });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const tutorsController = {
  createTutorProfile,
  getAllTutors,
  getAllTutorProfilesController,
  getTutorProfileById,
  getMyTutorProfile,
  updateTutorProfile,
  setAvailability,
};
