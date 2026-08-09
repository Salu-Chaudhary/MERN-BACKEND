import express from "express";
import orderController from "../controllers/order.controller.js";
import { auth } from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ADMIN_ROLE, MERCHANT_ROLE, USER_ROLE } from "../constants/roles.js";
import orderService from "../services/order.service.js";
import orderValidation from "../validations/orderValidation.js";
import validate from "../middlewares/validation.js";

const router = express.Router();
//GET ALL ORDERS
router.get(
  "/all",
  auth,
  roleBasedAuth(MERCHANT_ROLE),
  orderController.getOrders,
);

//CREATE ORDER
router.post(
  "/create",
  auth,
  roleBasedAuth(USER_ROLE),
  validate(orderValidation),
  orderController.createOrder,
);

//GET ORDER BY USER
router.get(
  "/user",
  auth,
  roleBasedAuth(USER_ROLE),
  orderController.getOrderByUser,
);

//ORDER BY ID
router.get(
  "/:id",
  auth,
  roleBasedAuth(MERCHANT_ROLE),
  orderController.getOrderById,
);

//CANCEL ORDER
router.put(
  "/:id/cancel",
  auth,
  roleBasedAuth(USER_ROLE),
  orderController.cancelOrder,
);

//DELETE ORDER
router.delete(
  "/:id",
  auth,
  roleBasedAuth(ADMIN_ROLE),
  orderController.deleteOrder,
);

//UPDATE ORDER
router.put(
  "/:id/status",
  auth,
  roleBasedAuth(USER_ROLE),
  orderController.OrderStatus,
);

router.post(
  "/:id/payment/khalti",
  auth,
  roleBasedAuth(USER_ROLE),
  orderController.orderPaymentViaKhalti,
);
export default router;
