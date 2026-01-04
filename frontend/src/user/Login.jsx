// Login.jsx
import React, { useState } from "react";
import Button from "../components/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/user/userSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { removeErrors, removeSuccess } from "../features/user/userSlice";
function Login() {
  const [Useremail, setUserEmail] = useState("");
  const [Userpassword, setUserPassword] = useState("");
  const { error, loading, success, isAuthenticated } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation()
  const redirect = new URLSearchParams(location.search).get("redirect") || "/"
  const handleLogin = (e) => {
    e.preventDefault();
    // console.log("Email:", email);
    // console.log("Password:", password);
    dispatch(login({ email: Useremail, password: Userpassword }))
  };
  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'top-center', autoClose: 3000 });
      dispatch(removeErrors())
    }
  }, [dispatch, error])

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect)
    }
  }, [isAuthenticated])
  useEffect(() => {
    if (success) {
      toast.success('Login Successful', { position: 'top-center', autoClose: 3000 })
      dispatch(removeSuccess())
    }
  }, [dispatch, success])

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100 w-full max-w-sm">
        <h2 className="text-3xl font-extrabold text-center text-black mb-6 uppercase tracking-wider">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2 uppercase text-xs tracking-wide">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              placeholder="Enter your email"
              value={Useremail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 font-bold mb-2 uppercase text-xs tracking-wide">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              placeholder="Enter your password"
              value={Userpassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-right mb-6">
            <Link to="/password/forgot" className="text-xs font-semibold text-gray-500 hover:text-black transition-colors">
              FORGOT PASSWORD?
            </Link>
          </div>

          <Button
            type="submit"
            text="SIGN IN"
            className="w-full bg-black text-white hover:bg-gray-800 transition-colors py-3 font-bold uppercase tracking-widest"
          />
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-black font-bold hover:underline ml-1">
            CREATE ACCOUNT
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
