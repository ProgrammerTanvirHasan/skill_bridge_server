import type { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

// all users
const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateUserProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { name, email } = req.body;

    if (email && typeof email !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    if (name && typeof name !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid name format" });
    }

    const updatedUser = await userService.updateUserProfile(userId, {
      name,
      email,
    });

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const getLoggedInUserController = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const userController = {
  getAllUsersController,
  updateUserProfileController,
  getLoggedInUserController,
};
