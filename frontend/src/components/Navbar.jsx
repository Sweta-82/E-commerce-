import React, { useEffect } from 'react'
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import { FaCartPlus, FaBell } from "react-icons/fa"; import { IoMdPersonAdd } from "react-icons/io";
import { Link } from 'react-router-dom';
import UserDashboard from '../user/userDashboard';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loadUser } from '../features/user/userSlice';


function Navbar() {
  // const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isAuthenticated, user } = useSelector(state => state.user);
  const { cartItems } = useSelector(state => state.cart);
  const dispatch = useDispatch()
  const [notificationCount, setNotificationCount] = React.useState(0);

  const cartCount = user ? cartItems.length : 0;

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser())
    }
  }, [dispatch, isAuthenticated])

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      const fetchNotifications = async () => {
        try {
          const { data } = await axios.get('/api/v1/admin/orders/notifications');
          setNotificationCount(data.unreadCount);
        } catch (error) {
          console.error("Failed to fetch notifications", error);
        }
      };
      fetchNotifications();
    }
  }, [isAuthenticated, user]);

  console.log(isAuthenticated, user);

  return (
    <nav className="bg-black text-white px-8 py-3 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* left section: logo + links */}
        <div className="flex items-center gap-10">
          {/* logo */}
          <Link to="/" className='no-underline flex items-center gap-2'>
            <img src="/logo_new.jpg" alt="Logo" className="h-10 w-10 rounded-full object-cover" />
            <h1 className='text-3xl font-extrabold tracking-widest text-white hover:text-gray-300 transition-colors duration-300 font-serif'>
              Bn
            </h1>
          </Link>

          {/*   links */}
          <ul className="hidden sm:flex gap-6 text-sm font-medium">
            <li className="hover:text-gray-300 cursor-pointer transition-colors"><Link to="/">Home</Link></li>
            <li className="hover:text-gray-300 cursor-pointer transition-colors"><Link to="/products">Products</Link></li>
            <li className="hover:text-gray-300 cursor-pointer transition-colors">About Us</li>
            <li className="hover:text-gray-300 cursor-pointer transition-colors">Contact</li>
          </ul>
        </div>

        {/* right section: search + cart + sign up */}
        <div className="flex items-center gap-4">

          {/* search box */}
          <div className="hidden md:flex items-center gap-2 border border-gray-300 px-2 py-1 rounded-2xl">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-white text-sm outline-none"
            />
            <CiSearch className="text-xl" />
          </div>

          {/* cart icon */}
          {user?.role === 'admin' ? (
            <Link to="/admin/notifications">
              <button className="relative text-2xl hover:text-gray-300 transition-colors">
                <FaBell />
                {notificationCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {notificationCount}
                  </span>
                )}
              </button>
            </Link>
          ) : (
            <Link to='/cart'>
              <button className="relative text-2xl hover:text-gray-300 transition-colors">
                <FaCartPlus />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>
          )}

          {/* signup icon */}
          <div className="relative">
            {isAuthenticated && user ? (
              <UserDashboard user={user} />
            ) : (
              <button className="text-2xl hover:text-gray-300 transition-colors">
                <Link to="/register">
                  <IoMdPersonAdd />
                </Link>
              </button>
            )}
          </div>

        </div>

      </div>
    </nav>
  );


}

export default Navbar