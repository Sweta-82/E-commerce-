import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import { MdDashboard } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";
import { MdAddBox } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { FaCartArrowDown } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
function Dashboard() {
  const [stats, setStats] = React.useState({
    productCount: 0,
    orderCount: 0,
    userCount: 0,
    totalIncome: 0,
    outOfStock: 0,
    inStock: 0
  });

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('/api/v1/admin/dashboard/stats');
        if (data.success) {
          setStats(data);
        }
      } catch (error) {
        console.error("Dashboard stats fetch failed", error);
      }
    }
    fetchStats();
  }, []);

  return (
    <>
      <Navbar />
      <PageTitle title="Admin Dashboard" />

      <div className="min-h-screen flex bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between hidden md:flex">
          <div>
            <h2 className="flex items-center text-2xl font-bold mb-8 gap-2 text-black border-b pb-4">
              <MdDashboard size={28} />
              Dashboard
            </h2>
            <ul className="space-y-6">
              <li>
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Inventory</p>
                <ul className="space-y-2">
                  <Link to='/admin/products'>
                    <li className='flex items-center gap-3 text-gray-700 hover:text-black transition-colors p-2 rounded hover:bg-gray-100 cursor-pointer'>
                      <FaBoxArchive /> All Products
                    </li>
                  </Link>
                  <Link to='/admin/products/create'>
                    <li className='flex items-center gap-3 text-gray-700 hover:text-black transition-colors p-2 rounded hover:bg-gray-100 cursor-pointer'>
                      <MdAddBox /> Create Product
                    </li>
                  </Link>
                </ul>
              </li>

              <li>
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Management</p>
                <ul className="space-y-2">
                  <Link to='/admin/users'>
                    <li className='flex items-center gap-3 text-gray-700 hover:text-black transition-colors p-2 rounded hover:bg-gray-100 cursor-pointer'>
                      <ImUsers /> Users
                    </li>
                  </Link>
                  <Link to='/admin/orders'>
                    <li className='flex items-center gap-3 text-gray-700 hover:text-black transition-colors p-2 rounded hover:bg-gray-100 cursor-pointer'>
                      <FaCartArrowDown /> Orders
                    </li>
                  </Link>
                  <Link to='/admin/reviews'>
                    <li className='flex items-center gap-3 text-gray-700 hover:text-black transition-colors p-2 rounded hover:bg-gray-100 cursor-pointer'>
                      <FaStar /> Reviews
                    </li>
                  </Link>
                </ul>
              </li>
            </ul>
          </div>
          <div className="text-xs text-gray-400 text-center mt-10">
            &copy; 2024 Admin Panel
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Overview</h1>
            <div className="text-gray-500">Welcome back, Admin</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {/* Card: Total Income */}
            <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-black transform hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-600">Total Income</h3>
                  <p className="mt-2 text-gray-800 text-3xl font-bold">₹{stats.totalIncome}</p>
                </div>
                <div className="p-3 bg-black text-white rounded-full">
                  <FaCartArrowDown size={20} />
                </div>
              </div>
            </div>

            {/* Card: Products */}
            <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-black transform hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-600">Products</h3>
                  <p className="mt-2 text-gray-800 text-3xl font-bold">{stats.productCount}</p>
                </div>
                <div className="p-3 bg-black text-white rounded-full">
                  <FaBoxArchive size={20} />
                </div>
              </div>
              <div className="mt-4 flex gap-4 text-sm">
                <span className="text-green-600 font-medium">{stats.inStock} In Stock</span>
                <span className="text-red-600 font-medium">{stats.outOfStock} Out of Stock</span>
              </div>
            </div>

            {/* Card: Orders */}
            <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-black transform hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-600">Msg Orders</h3>
                  <p className="mt-2 text-gray-800 text-3xl font-bold">{stats.orderCount}</p>
                </div>
                <div className="p-3 bg-black text-white rounded-full">
                  <MdDashboard size={20} />
                </div>
              </div>
            </div>

            {/* Card: Users */}
            <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-black transform hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-600">Users</h3>
                  <p className="mt-2 text-gray-800 text-3xl font-bold">{stats.userCount}</p>
                </div>
                <div className="p-3 bg-black text-white rounded-full">
                  <ImUsers size={20} />
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;
