import {
  adminService
} from "./chunk-DJBOWZLI.js";

// src/modules/admin/admin.controller.ts
var getAllUsers = async (req, res, next) => {
  try {
    const result = await adminService.getAllUsers();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["ACTIVE", "BANNED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "status must be ACTIVE or BANNED"
      });
    }
    const result = await adminService.updateUserStatus(id, status);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var getAllBookings = async (req, res, next) => {
  try {
    const result = await adminService.getAllBookings();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var getCategories = async (req, res, next) => {
  try {
    const result = await adminService.getAllCategoriesAdmin();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    console.log(req.body, "body");
    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "name is required"
      });
    }
    const result = await adminService.createCategory(name.trim());
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var updateCategory = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;
    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        message: "name is required"
      });
    }
    const result = await adminService.updateCategory(id, name.trim());
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
var deleteCategory = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await adminService.deleteCategory(id);
    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    next(error);
  }
};
var adminController = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
};

export {
  adminController
};
