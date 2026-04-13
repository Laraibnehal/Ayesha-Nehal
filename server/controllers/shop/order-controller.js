
const razorpay = require("../../helpers/razor");
const Order = require("../../models/Order");
const createOrder = async (req, res) => {
  try {
    const {
      userId,
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


const create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: 'razorpay',
        },
     redirect_urls: {
        return_url: "http://localhost:5173/shop/razorpay-return",
        cancel_url: "http://localhost:3000/razorpay-cancel",
     },
     transactions: [
        {
            item_list: {
                items: cartItems.map((item) => ({
                    name: item.title,
                    sku: item.productId,    
                    price: item.price.toFixed(2),
                    currency: "INR",
                    quantity: item.quantity,
                })),
            },
            amount: {
                currency: "INR",
                total: totalAmount.toFixed(2),
            },
            description: "Order payment",
        },
     ],
};

razorpay.payment.create(create_payment_json, async (err, paymentInfo) => {
if(err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error creating payment",
    });
    } else {
        const newlyCreatedOrder = new Order({
          userId,
          cartId,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          orderDate,
          orderUpdateDate,
          totalAmount,
          paymentId,
          payerId
          
        });
      await newlyCreatedOrder.save();
      const approvalURL = paymentInfo.links.find(link => link.rel === 'approval_url').href;
      res.status(201).json({
        success: true,
        message: "Order created successfully",
        orderId: newlyCreatedOrder._id,
        approvalURL,

      })

    }
});
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
module.exports = { createOrder, capturePayment };
