import Order from "../models/OrderModel.js";

export const getOrderById = async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order not found" });
    }
};

export const createNewUser = async (req, res) => {
  try {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((item) => ({
        ...item,
        product: item._id,
      })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user.id,
    });
    const order = await newOrder.save();
    res.status(201).send({ message: "New Order Created", order });
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error);
  }
};