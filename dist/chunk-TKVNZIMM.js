import {
  userController
} from "./chunk-LUUPSJO3.js";
import {
  authMiddleware_default
} from "./chunk-RJPOOT2T.js";

// src/modules/user/user.route.ts
import express from "express";
var router = express.Router();
router.get("/", userController.getAllUsersController);
router.get("/me", authMiddleware_default(), userController.getLoggedInUserController);
router.patch(
  "/update",
  authMiddleware_default(),
  userController.updateUserProfileController
);
var userRouter = router;

export {
  userRouter
};
