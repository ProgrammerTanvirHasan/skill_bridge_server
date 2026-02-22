import {
  adminController
} from "./chunk-KAZ5R2EK.js";
import {
  authMiddleware_default
} from "./chunk-RJPOOT2T.js";

// src/modules/admin/admin.route.ts
import express from "express";
var router = express.Router();
router.get(
  "/users",
  authMiddleware_default("ADMIN" /* ADMIN */),
  adminController.getAllUsers
);
router.patch(
  "/users/:id",
  authMiddleware_default("ADMIN" /* ADMIN */),
  adminController.updateUserStatus
);
router.get("/bookings", adminController.getAllBookings);
router.get("/categories", adminController.getCategories);
router.post(
  "/categories",
  authMiddleware_default("ADMIN" /* ADMIN */),
  adminController.createCategory
);
router.patch(
  "/categories/:id",
  authMiddleware_default("ADMIN" /* ADMIN */),
  adminController.updateCategory
);
router.delete(
  "/categories/:id",
  authMiddleware_default("ADMIN" /* ADMIN */),
  adminController.deleteCategory
);
var adminRouter = router;

export {
  adminRouter
};
