import {
  userController
} from "./chunk-LUUPSJO3.js";
import {
  auth_default
} from "./chunk-3EAPRASJ.js";

// src/modules/user/user.route.ts
import express from "express";
var router = express.Router();
router.get("/", userController.getAllUsersController);
router.get("/me", auth_default(), userController.getLoggedInUserController);
router.patch(
  "/update",
  auth_default(),
  userController.updateUserProfileController
);
var userRouter = router;

export {
  userRouter
};
