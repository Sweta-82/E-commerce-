import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout, removeSuccess } from '../features/user/userSlice';

function UserDashboard({ user }) {

  const { cartItems } = useSelector(state => state.cart)
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const orders = () => {
    setMenuVisible(false);
    if (user?.role === 'admin') {
      navigate("/admin/orders");
    } else {
      navigate("/orders/user");
    }
  };

  const profile = () => {
    setMenuVisible(false);
    navigate("/profile");
  };

  const logoutUser = () => {
    setMenuVisible(false);
    console.log("Logout clicked");
    dispatch(logout()).unwrap()
      .then(() => {
        toast.success('Logout Successful', { position: 'top-center', autoClose: 3000 })
        dispatch(removeSuccess())
        navigate('/login')
      })
      .catch((error) => {
        toast.success(error.message || 'Logout Failed', { position: 'top-center', autoClose: 3000 })
      })

  };

  function dashboard() {
    navigate("/admin/dashboard")
  }

  function mycart() {
    navigate('/cart')
  }

  function notifications() {
    navigate('/admin/notifications')
  }

  const options = [
    { name: 'Orders', funcName: orders },
    { name: 'Profile', funcName: profile },
  ];

  if (user?.role === 'admin') {
    options.unshift({ name: 'Admin Dashboard', funcName: dashboard });
    options.push({ name: 'Notifications', funcName: notifications });
  } else {
    options.push({ name: `Cart (${cartItems.length})`, funcName: mycart });
  }

  options.push({ name: 'Logout', funcName: logoutUser });




  return (
    <>

      {/* Dashboard Container */}
      <div className="relative z-20 inline-block text-left">
        {/* Profile Header */}
        <div
          className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-900"
          onClick={toggleMenu}
        >
          <img
            src={user?.avatar?.url || 'https://i.pinimg.com/736x/67/54/55/675455f961bfb9346daa8a2b7e41306f.jpg'}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">{user?.name || 'User'}</span>
        </div>

        {/* Dropdown Menu */}
        {menuVisible && (
          <div className="absolute mt-2 right-0 w-40 bg-[#f0f0f0a5] border-gray-200 rounded-md shadow-lg">
            {options.map((item) => (
              <button
                key={item.name}
                onClick={item.funcName}
                className={`w-full text-left px-4 py-2 border-gray-200 rounded-md transition-colors
                    hover:bg-[#ffee01db] 
                    ${item.name === 'Orders' && cartItems.length > 0
                    ? 'text-black'
                    : 'text-gray-800'
                  }
                `}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default UserDashboard;
