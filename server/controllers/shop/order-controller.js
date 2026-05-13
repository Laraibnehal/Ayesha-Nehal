const razorpay = require("../../helpers/razor");
const Order = require("../../models/Order");
const Product = require("../../models/Product"); // ✅ make sure this is imported
const Cart = require("../../models/Cart");      // ✅ make sure this is imported
const crypto = require("crypto");                // ✅ move to top

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      orderUpdateDate,
      totalAmount,
      paymentId,
      payerId,
    } = req.body;

    const options = {
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: { userId, cartId },
    };

    const paymentInfo = await razorpay.orders.create(options);

    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,      // ✅ was missing!
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      orderUpdateDate,
      totalAmount,
      paymentId,
      payerId,
      razorpayOrderId: paymentInfo.id,
    });

    await newlyCreatedOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      orderId: newlyCreatedOrder._id,
      razorpayOrderId: paymentInfo.id,
      amount: paymentInfo.amount,
      currency: paymentInfo.currency,
    });

  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { razorpay_order_id,
       razorpay_payment_id, 
       razorpay_signature, 
       orderId
       } = req.body;

    // ✅ Step 1: Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    // ✅ Step 2: Find order
    let order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // ✅ Step 3: Update payment status
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = razorpay_payment_id;
    order.payerId = razorpay_order_id;

    // ✅ Step 4: Reduce product stock
    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.productId}`,
        });
      }
      product.totalStock -= item.quantity;
      await product.save();
    }

    // ✅ Step 5: Delete cart
    const getCartId = order.cartId;
    console.log("Cart ID to delete:", getCartId);           // ✅ debug log
    const deletedCart = await Cart.findByIdAndDelete(getCartId);
    console.log("Deleted cart:", deletedCart);              // ✅ debug log

    // ✅ Step 6: Save order
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });

  } catch (error) {
    console.error("Error capturing payment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const getAllOrdersByUser= async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId }).sort({ orderDate: -1 });
    if (!orders.length) {
      return res.status(404).json({ 
        success: false,
         message: "No orders found for this user" });
    }
    res.status(200).json({ success: true, data: orders });
    
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const getOrderDetails= async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ 
        success: false,
         message: "Order not found" });
    }
    res.status(200).json({ success: true, data: order });
    
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
module.exports = { createOrder, capturePayment, getAllOrdersByUser, getOrderDetails };