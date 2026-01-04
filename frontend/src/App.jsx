import React from 'react'
import Home from './page/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProductDetails from './page/ProductDetails'
import Products from './page/Products'
import Register from './user/Register'
import Login from './user/Login'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './features/user/userSlice'
import { useEffect } from 'react'
import Profile from './user/Profile'
import UpdatedProfile from './user/UpdatedProfile'
import UpdatePassword from './user/UpdatePassword'
import ForgotPassword from './user/ForgotPassword'
import ResetPassword from './user/ResetPassword'
import Cart from './Cart/Cart'
import Shipping from './Cart/Shipping'
import OrderConform from './Cart/OrderConform'
import Payment from './Cart/Payment'
import OrderSuccess from './Cart/OrderSuccess'
import MyOrder from './Order/MyOrder'
import OrderDetails from './Order/OrderDetails'
import Dashboard from './Admin/Dashboard'
import ProductList from './Admin/ProductList'
import CreateProduct from './Admin/CreateProduct'
import AdminNotifications from './Admin/AdminNotifications'
import OrderList from './Admin/OrderList'
import UserList from './Admin/UserList'
import ProductReviews from './Admin/ProductReviews'
import UpdateProduct from './Admin/UpdateProduct'
import ProcessOrder from './Admin/ProcessOrder'
function App() {

  const { isAuthenticated, user } = useSelector(state => state.user);
  const dispatch = useDispatch()

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser())
    }
  }, [dispatch])
  console.log(isAuthenticated, user);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/update" element={<UpdatedProfile />} />
          {/* {isAuthenticated && <UpdatePassword user={user}/>} */}
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/conform" element={<OrderConform />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/process/payment" element={<Payment />} />
          <Route path="/success" element={<OrderSuccess />} />

          {/* admin  */}
          <Route path="/admin/dashboard" element={<Dashboard />} adminOnly={true} />
          <Route path="/admin/notifications" element={<AdminNotifications />} adminOnly={true} />
          <Route path="/admin/orders" element={<OrderList />} adminOnly={true} />
          <Route path="/admin/order/:id" element={<ProcessOrder />} adminOnly={true} />
          <Route path="/admin/users" element={<UserList />} adminOnly={true} />
          <Route path="/orders/user" element={<MyOrder />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/products/create" element={<CreateProduct />} />
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
          <Route path="/admin/reviews" element={<ProductReviews />} />


        </Routes>
        {/* {isAuthenticated && <Userdashboard user={user}/>} */}
        {/* {<UserDashboard user={user}/>} */}
      </Router>
    </>
  )
}

export default App