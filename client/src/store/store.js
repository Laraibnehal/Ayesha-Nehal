import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import adminProductsSlice from './admin/products-slice/index'
import shopProductsSlice from './shop/products-slice/index'
// import adminProducts from '@/pages/admin-view/products';
import shopCartSlice from './shop/cart-slice/index'
import shopAddressSlice from './shop/address-slice/index'
import shopOrderSlice from './shop/order-slice/index'
import adminOrderSlice from './admin/orders-slice/index'


const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsSlice,
        shopProducts: shopProductsSlice,
        shopCart: shopCartSlice,
        shopAddress: shopAddressSlice,
        shopOrder: shopOrderSlice,
        adminOrder: adminOrderSlice
    }
})

export default store;
