// require('dotenv').config({path: './.env'})
// console.log("DIR:", __dirname);
// console.log("RAZORPAY KEY:", process.env.RAZORPAY_KEY_ID);
const express = require('express');
const  mongoose  = require('mongoose');
const cookieParser = require('cookie-parser')
const cors= require('cors');
const authRouter = require('./routes/auth/auth-routes')
const adminProductsRouter = require('./routes/admin/products-routes')
const shopProductsRouter = require('./routes/shop/products-routes')
const shopCartRouter = require('./routes/shop/cart-routes')
const shopAddressRouter = require('./routes/shop/address-routes')
const shopOrderRouter = require('./routes/shop/order-routes')
const adminOrderRouter = require('./routes/admin/order-routes')
const connectDB = require('./db/conn')
const path = require("path");
require('dotenv').config({ path: path.join(__dirname, '.env') }); // ✅ always resolves correctly regardless of where you run from

// mongoose.connect(DATABASE).then(()=>console.log('MongoDB connected')
// ).catch((error)=>console.log(error))
 const app = express();
 const PORT = process.env.PORT || 5000;
 app.use(
    cors({
        origin: ["http://localhost:5173",
             "https://ayesha-nehal.vercel.app"
        ],
      // ✅ allow all Vercel preview URLs
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
        methods: ["GET", "POST", 'DELETE','PUT'],
        allowedHeaders: [
            "Content-Type", 
            "Authorization",
            "Cache-Control",
            "Pragma",
            "Expires"
        ],
        credentials: true,
    })
 )
 app.use(
    express.urlencoded({ extended: true })
);
 app.use(cookieParser());
 app.use(express.json());
 app.use("/api/auth", authRouter)
 app.use('/api/admin/products', adminProductsRouter)
 app.use("/api/admin/orders", adminOrderRouter)
 app.use("/api/shop/products", shopProductsRouter)
 app.use("/api/shop/cart", shopCartRouter)
 app.use("/api/shop/address", shopAddressRouter)
 app.use("/api/shop/order", shopOrderRouter)

//  /api/auth/register => registerUser
//  /api/auth/login => loginUser
const start = async () => {
  try {
    await connectDB(process.env.DATABASE); // ✅ await this
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
