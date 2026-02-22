import {
  adminController
} from "./chunk-KAZ5R2EK.js";
import {
  auth_default
} from "./chunk-3EAPRASJ.js";

// src/modules/admin/admin.route.ts
import express from "express";
var router = express.Router();
router.get("/users", auth_default("ADMIN" /* ADMIN */), adminController.getAllUsers);
router.patch(
  "/users/:id",
  auth_default("ADMIN" /* ADMIN */),
  adminController.updateUserStatus
);
router.get("/bookings", adminController.getAllBookings);
router.get("/categories", adminController.getCategories);
router.post(
  "/categories",
  auth_default("ADMIN" /* ADMIN */),
  adminController.createCategory
);
router.patch(
  "/categories/:id",
  auth_default("ADMIN" /* ADMIN */),
  adminController.updateCategory
);
router.delete(
  "/categories/:id",
  auth_default("ADMIN" /* ADMIN */),
  adminController.deleteCategory
);
var adminRouter = router;

export {
  adminRouter
};
