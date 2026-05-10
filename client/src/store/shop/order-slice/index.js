import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    razorpayOrderId: null,  // ✅ replaces approvalURL
    amount: null,           // ✅ needed to open Razorpay checkout
    currency: null,         // ✅ needed to open Razorpay checkout
    isLoading: false,
    orderId: null,
    orderList: [], // ✅ for storing user's past orders
    orderDetails: null, // ✅ for storing details of a single order
}

export const createNewOrder = createAsyncThunk(
'/order/createNewOrder', async (orderData, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:5000/api/shop/order/create", orderData);
        return response.data;
    } catch (error) {
        // ✅ Properly capture server error messages
        return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
})

export const capturePayment = createAsyncThunk(
'/order/capturePayment', async ( { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId  }) => {
    try {
            console.log("Sending to backend:", { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId });
        const response = await axios.post("http://localhost:5000/api/shop/order/capture", 
            { razorpay_order_id, 
            razorpay_payment_id, 
            razorpay_signature,
             orderId }
        );
         console.log("Backend response:", response.data); // ✅
        return response.data;
    } catch (error) {
         console.log("Axios error:", error.response?.data); // ✅
      console.log("Axios status:", error.response?.status); // ✅
        return rejectWithValue(error.response?.data?.message || "Payment capture failed");
    }
})
export const getAllOrdersByUserId = createAsyncThunk(
'/order/getAllOrdersByUserId', async (userId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/shop/order/list/${userId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
    }
});
export const getOrderDetails = createAsyncThunk(
'/order/getOrderDetails', async (orderId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/shop/order/details/${orderId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch order details");
    }
});


const shoppingOrderSlice = createSlice({
    name: 'shoppingOrderSlice',
    initialState,
    reducers: {
        resetOrder: (state) => {
            // ✅ useful to call after payment completes or is cancelled
            state.razorpayOrderId = null;
            state.amount = null;
            state.currency = null;
            state.orderId = null;
        }
    },
    extraReducers: (builder) => { 
        // createNewOrder
        builder.addCase(createNewOrder.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createNewOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.razorpayOrderId = action.payload.razorpayOrderId;  // ✅
            state.amount = action.payload.amount;                      // ✅
            state.currency = action.payload.currency;                  // ✅
            state.orderId = action.payload.orderId;
            sessionStorage.setItem("currentOrderId", JSON.stringify(action.payload.orderId)); // ✅ store orderId for later use
        })
        .addCase(createNewOrder.rejected, (state) => {
            state.isLoading = false;
            state.razorpayOrderId = null;
            state.amount = null;
            state.currency = null;
            state.orderId = null;
        })

        // capturePayment
        .addCase(capturePayment.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(capturePayment.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(capturePayment.rejected, (state) => {
            state.isLoading = false;
        })
        // getAllOrdersByUserId
        .addCase(getAllOrdersByUserId.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderList = action.payload.data; // ✅ assuming backend sends { orders: [...] }
        })
        .addCase(getAllOrdersByUserId.rejected, (state) => {
            state.isLoading = false;
            state.orderList = [];
        })
        // getOrderDetails
        // ✅ This will be useful for an order details page where we want to show all info about a single order
        // including items, address, payment info, etc.
        .addCase(getOrderDetails.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getOrderDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderDetails = action.payload.data; // ✅ assuming backend sends { order: {...} }
        })
        .addCase(getOrderDetails.rejected, (state) => {
            state.isLoading = false;
            state.orderDetails = null;
        })
    },
})

export const { resetOrder } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;