import express from "express";
import { userController } from "./user.controller";
import authMiddleware from "../../middleware/authMiddleware";

const router = express.Router();

router.get("/", userController.getAllUsersController);

router.get("/me", authMiddleware(), userController.getLoggedInUserController);
router.patch(
  "/update",
  authMiddleware(),
  userController.updateUserProfileController,
);

export const userRouter = router;
