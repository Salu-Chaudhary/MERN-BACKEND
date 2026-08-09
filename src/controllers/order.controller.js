import orderService from "../services/order.service.js";

const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body, req.user._id);
    return res.json(order);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const cancelOrder = async (req, res) => {
  try {
    const cancelledOrder = await orderService.cancelOrder(
      req.params.id,
      req.user,
    );
    return res.send(cancelledOrder);
  } catch (error) {
    return res.status(error.status || 400).send(error.message);
  }
};

const getOrders = async (req, res) => {
  console.log("something");
  console.log(req.params.id);     
  try {
    const orders = await orderService.getOrders();
    console.log(orders);
    return res.send(orders);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getOrderByUser = async (req, res) => {
  try {
    const orders = await orderService.getOrderByUser(req.user._id);
    return res.send(orders);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    return res.send(order);
  } catch (error) {
    return res.status(error?.status || 400).send(error?.message);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orders = await orderService.deleteOrders(req.params.id);
    return res.send("Order deleted successfully");
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

const OrderStatus = async (req, res) => {
  try {
    const order = await orderService.updateOrderStatus(req.body, req.user.id);
    return res.send("CONFIRMED");
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const orderPaymentViaKhalti = async (req, res) => {
  try {
    const orderPayment = await orderService.orderPaymentViaKhalti(
      req.params.id,
    );
    return res.send(orderPayment);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export default {
  createOrder,
  getOrders,
  cancelOrder,
  getOrderById,
  getOrderByUser,
  deleteOrder,
  OrderStatus,
  orderPaymentViaKhalti,
};
