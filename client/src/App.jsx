
import { Routes, Route} from 'react-router-dom'
import './App.css'
import AuthLayout from './components/ui/auth/layout.jsx'
import AuthLogin from './pages/auth/login.jsx'
import AuthRegister from './pages/auth/register'
import Adminlayout from './components/admin-view/layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminOrders from './pages/admin-view/orders'
import AdminProducts from './pages/admin-view/products'
import AdminFeatures from './pages/admin-view/features'
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './pages/not-found'
import ShoppingAccount from './pages/shopping-view/account'
import ShoppingListing from './pages/shopping-view/listing'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingCheckout from './pages/shopping-view/checkout'
import CheckAuth from './components/common/check-auth'
import UnauthPage from './pages/unauth-page'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from "@/components/ui/skeleton"
import PaymentSuccessPage from './pages/shopping-view/payment-success'

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
 useEffect(() => {
  // console.log("useEffect trigger")
    dispatch(checkAuth());
  }, [dispatch]);
if(isLoading) return <Skeleton className="w-[800] h-[600px] bg-[#6c6e5c]" />

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      {/* <h1>header component</h1> */}
      <Routes>
      {/* <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        /> */}
        <Route path="/auth" element={
          <CheckAuth isAuthenticated = {isAuthenticated} user={user}>
            <AuthLayout/>
          </CheckAuth>
        } >
        <Route path="login" element={<AuthLogin/>} />
        <Route path="register" element={<AuthRegister/>} />
        </Route>

        <Route path="/admin" element={
          <CheckAuth isAuthenticated = {isAuthenticated} user={user}>
            <Adminlayout/>
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard/>} />
          <Route path="orders" element={<AdminOrders/>} />
          <Route path="products" element={<AdminProducts/>} />
          <Route path="features" element={<AdminFeatures/>} />
        </Route>

        <Route path="/shop" element={
          <CheckAuth isAuthenticated = {isAuthenticated} user={user}>
            <ShoppingLayout/>
          </CheckAuth>
        }>
        <Route path="account" element={<ShoppingAccount/>}/>
        <Route path="listing" element={<ShoppingListing/>}/>
        <Route path="home" element={<ShoppingHome/>}/>
        <Route path="checkout" element={<ShoppingCheckout/>}/>
        <Route path="payment-success" element={<PaymentSuccessPage/>}/>
        </Route>
        <Route path="*" element={<NotFound />}/>
        <Route path="/unauth-page" element={<UnauthPage/>}/>
      </Routes>
       
    </div>
  )
}

export default App
