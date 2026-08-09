import express from "express";
import productController from "../controllers/product.controller.js";
import { auth } from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { MERCHANT_ROLE } from "../constants/roles.js";
import validate from "../middlewares/validation.js";
import productCreateSchema from "../validations/productValidation.js";
import { upload } from "../config/cloudinary.js";
const router = express.Router();

//GET
router.get("/products/all", productController.getAllProducts);
router.get("/products/:id", productController.getProductByID);

//POST
router.post(
  "/products/all",
  auth,
  roleBasedAuth(MERCHANT_ROLE),
  upload.single("image"),
  validate(productCreateSchema),
  productController.createdProduct,
);

//DELETE
router.delete(
  "/products/:id",
  auth,
  roleBasedAuth(MERCHANT_ROLE),
  productController.deleteProduct,
);

//PATCH
router.patch(
  "/products/:id",
  auth,
  roleBasedAuth(MERCHANT_ROLE),
  productController.updateProduct,
);

export default router;
