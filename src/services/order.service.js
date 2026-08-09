import { ORDER_STATUS_CANCELLED } from "../constants/orderStatuses.js";
import { ADMIN_ROLE } from "../constants/roles.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import { payViaKhalti } from "../utils/khaltiPayment.js";

const createOrder = async (data, userId) => {
  const orderNumber = crypto.randomUUID();
  const order = await Order.create({ ...data, user: userId, orderNumber });
  return order;
};

const getOrderById = async (id) => {
  const order = await Order.findById(id)
    .populate("user", "name email")
    .populate("orderItems.product", "name size price quantity");

  if (!order)
    throw {
      status: 404,
      message: "Order not found!",
    };

  return order;
};

const cancelOrder = async (id, user) => {
  const order = await getOrderById(id);

  if (!user.role.includes(ADMIN_ROLE) && order.user._id != user._id)
    throw {
      status: 403, //forbidden
      message: "Access denied",
    };

  const cancelledOrder = await Order.findByIdAndUpdate(
    id,
    {
      status: ORDER_STATUS_CANCELLED,
    },
    { new: true },
  );

  return cancelledOrder;
};

const getOrderByUser = async (userId) => {
  const order = await Order.find({ user: userId })
    .sort({
      createdAt: -1,
    })
    .populate("user", "name email")
    .populate("orderItems.product", "name price size");

  return order;
};

const getOrders = async () => {
  return await Order.find()
    .sort({ createdAt: -1 })
    .populate("user", "name email mobile")
    .populate("orderItems.product");
};

const deleteOrders = async (id) => {
  const order = await Order.findByIdAndDelete(id);
  return order;
};

const updateOrderStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(id, { status: status }, { new: true });
};

//ORDER PAYMENT

const orderPaymentViaKhalti = async (id) => {
  const order = await getOrderById(id);

  if (!order)
    throw {
      status: 404,
      message: "Order not found!",
    };

  const transactionId = crypto.randomUUID(); 
  const orderPayment = await Payment.create({
    transactionId,
    amount: order.totalPrice,
    method: "ONLINE",
  });

  
  await Order.findByIdAndUpdate(id, { payment: orderPayment._id });

  
  return await payViaKhalti({
    amount: order.totalPrice,
    purchaseOrderId: order.orderNumber,
    purchaseOrderName: order.orderItems[0]?.product?.name,
    customer: order.user,
  });
};

export default {
  createOrder,
  getOrders,
  getOrderById,
  cancelOrder,
  getOrderByUser,
  deleteOrders,
  updateOrderStatus,
  orderPaymentViaKhalti,
};
