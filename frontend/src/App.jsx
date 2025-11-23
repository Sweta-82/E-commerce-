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
import UserDashboard from './user/userDashboard'
import Profile from './user/Profile'
import UpdatedProfile from './user/UpdatedProfile'
import UpdatePassword from './user/UpdatePassword'
import ForgotPassword from './user/ForgotPassword'
import ResetPassword from './user/ResetPassword'
import Cart from './Cart/Cart'
import Shipping from './Cart/Shipping'
import OrderConform from './Cart/OrderConform'
import Payment from './Cart/Payment'
import MyOrder from './Order/MyOrder'
import Dashboard from './Admin/Dashboard'
import ProductList from './Admin/ProductList'
import CreateProduct from './Admin/CreateProduct'
function App() {
  const {isAuthenticated, user}=useSelector(state=>state.user);
  const dispatch=useDispatch()

  useEffect(()=>{
    if(isAuthenticated){
    dispatch(loadUser())
    }
  },[dispatch])
  console.log(isAuthenticated,user);
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/profile/update" element={<UpdatedProfile/>}/>
        {/* {isAuthenticated && <UpdatePassword user={user}/>} */}
        <Route path="/password/update" element={<UpdatePassword/>}/>
        <Route path="/password/forgot" element={<ForgotPassword/>}/>
        <Route path="/reset/:token" element={<ResetPassword/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/shipping" element={<Shipping/>}/>
        <Route path="/order/conform" element={<OrderConform/>}/>
        <Route path="/process/payment" element={<Payment/>}/>

        {/* admin  */}
        <Route path="/admin/dashboard" element={<Dashboard/>} adminOnly={true}/>
        <Route path="/orders/user" element={<MyOrder/>}/>
        <Route path="/admin/products" element={<ProductList/>}/>
        <Route path="/admin/products/create" element={<CreateProduct/>}/>


      </Routes>
      {/* {isAuthenticated && <Userdashboard user={user}/>} */}
      {/* {<UserDashboard user={user}/>} */}
    </Router>
    </>
  )
}

export default App