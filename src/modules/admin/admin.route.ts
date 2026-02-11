import express from "express";

import { adminController } from "./admin.controller";
import middleware, { userRole } from "../../middleware/auth";

const router = express.Router();

router.get("/users", middleware(userRole.ADMIN), adminController.getAllUsers);
router.patch(
  "/users/:id",
  middleware(userRole.ADMIN),
  adminController.updateUserStatus,
);
router.get("/bookings", adminController.getAllBookings);
router.get("/categories", adminController.getCategories);
router.post(
  "/categories",
  middleware(userRole.ADMIN),
  adminController.createCategory,
);
router.patch(
  "/categories/:id",
  middleware(userRole.ADMIN),
  adminController.updateCategory,
);
router.delete(
  "/categories/:id",
  middleware(userRole.ADMIN),
  adminController.deleteCategory,
);

export const adminRouter = router;
