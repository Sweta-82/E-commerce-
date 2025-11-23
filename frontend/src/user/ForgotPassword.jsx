// Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, login } from "../features/user/userSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { removeErrors, removeSuccess } from "../features/user/userSlice";
import PageTitle from "../components/pageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
function ForgotPassword() {
  const {error,loading,success,message}=useSelector(state=>state.user);
  const dispatch=useDispatch();
    const [email,setEmail]=useState("");
    const forgotPasswordEmail=(e)=>{
        e.preventDefault();
        const myForm=new FormData();
        myForm.set('email',email)
        dispatch(forgotPassword(myForm))
        setEmail("");
    }
        useEffect(()=>{
                if(error){
                  toast.error(error,{position:'top-center',autoClose:3000});
                  dispatch(removeErrors())
                }
              },[dispatch,error])

        useEffect(()=>{
                if(success){
                  toast.success(message,{position:'top-center',autoClose:3000});
                  dispatch(removeSuccess());
                }
              },[dispatch,success])

  return (
    <>
    <PageTitle title={'Forgot password'}/>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        <form onSubmit={forgotPasswordEmail}>
          <div className="mb-4">
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your register email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
          
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {loading?'Sending...':'Send'}

          </button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default ForgotPassword;
