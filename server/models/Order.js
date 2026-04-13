const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  userId: String,
  cartId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      price: String,
      Image: String,
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
});
module.exports = mongoose.model("Order", OrderSchema);
