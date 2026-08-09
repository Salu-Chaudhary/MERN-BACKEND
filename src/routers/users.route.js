import express from "express";
import usersController from "../controllers/users.controller.js";
import { auth } from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ADMIN_ROLE, USER_ROLE } from "../constants/roles.js";
import validate from "../middlewares/validation.js";
import userRegisterSchema from "../validations/userValidation.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.get(
  "/users/all",
  auth,
  roleBasedAuth(ADMIN_ROLE),
  usersController.getAllUsers,
);

router.get("/users/:id", auth, usersController.getUserByID);

router.post("/users/all", usersController.createdUsers);

router.put(
  "/users/:id",
  auth,
  validate(userRegisterSchema),
  usersController.updateUser,
);

router.delete(
  "/users/:id",
  auth,
  roleBasedAuth(ADMIN_ROLE),
  usersController.deleteUser,
);

router.put(
  "/users/:id/role",
  auth,
  roleBasedAuth(ADMIN_ROLE),
  usersController.updateRole,
);

router.put(
  "/:id/profile-image",
  auth,
  roleBasedAuth(USER_ROLE),
  upload.single("profileImage"),
  usersController.updateProfileImage,
);

export default router;
