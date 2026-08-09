import express from "express";
import authController from "../controllers/auth.controller.js";
import validate from "../middlewares/validation.js";
import userValidation from "../validations/userValidation.js";

const router = express.Router();

router.post(
  "/users/login",
  (req, res, next) => {
    console.log(req.body);

    next();
  },
  authController.login,
);
router.post(
  "/users/register",
  validate(userValidation),
  authController.register,
);
router.post("/forget-password", authController.forgetPassword);
router.post("/reset-password/:id", authController.resetPassword);

export default router;
