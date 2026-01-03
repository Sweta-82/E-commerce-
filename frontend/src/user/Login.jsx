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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={Useremail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={Userpassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-right mb-4">
            <Link to="/password/forgot" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            text="Sign In"
            className="w-full"
          />
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 font-medium hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
