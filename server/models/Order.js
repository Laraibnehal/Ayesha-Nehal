const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  cartId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      price: Number,      // ✅ changed from String to Number
      image: String,      // ✅ fixed typo: "Image" → "image" (must match frontend)
      quantity: Number,
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  paymentMethod: String,
  paymentStatus: String,
  orderStatus: String,
  orderDate: Date,
  orderUpdateDate: Date,
  totalAmount: Number,
  paymentId: String,
  payerId: String,
  razorpayOrderId: String,  // ✅ add this
});

module.exports = mongoose.model("Order", OrderSchema);