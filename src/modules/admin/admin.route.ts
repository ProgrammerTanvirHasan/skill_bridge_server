import express from "express";

import { adminController } from "./admin.controller";
import authMiddleware, { userRole } from "../../middleware/authMiddleware";

const router = express.Router();

router.get(
  "/users",
  authMiddleware(userRole.ADMIN),
  adminController.getAllUsers,
);
router.patch(
  "/users/:id",
  authMiddleware(userRole.ADMIN),
  adminController.updateUserStatus,
);
router.get("/bookings", adminController.getAllBookings);
router.get("/categories", adminController.getCategories);
router.post(
  "/categories",
  authMiddleware(userRole.ADMIN),
  adminController.createCategory,
);
router.patch(
  "/categories/:id",
  authMiddleware(userRole.ADMIN),
  adminController.updateCategory,
);
router.delete(
  "/categories/:id",
  authMiddleware(userRole.ADMIN),
  adminController.deleteCategory,
);

export const adminRouter = router;
