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
function Dashboard() {
  return (
    <>
      <Navbar />
      <PageTitle title="Admin Dashboard" />
      
      <div className="min-h-screen flex bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-6">
          <h2 className="flex items-center text-2xl font-bold mb-6 gap-2 text-blue-600">
            <MdDashboard size={24} />
            Dashboard
            </h2>
          <ul className="space-y-4">
            <li className="font-semibold text-gray-700">Products</li>
            <ul className="ml-4 text-gray-600 space-y-2">
                <Link to ='/admin/products'>
              <li className='flex items-center gap-2'><FaBoxArchive /> All Products</li>
                </Link>
                <Link to={'/admin/products/create'}>
              <li className='flex items-center gap-2'><MdAddBox /> Create Product</li>
                </Link>
            </ul>

            <li className="font-semibold text-gray-700">Users</li>
            <ul className="ml-4 text-gray-600 space-y-2">
                <Link to={'/admin/users'}>
              <li className='flex items-center gap-2'><ImUsers /> All Users</li>
                </Link>
            </ul>

            <li className="font-semibold text-gray-700">Orders</li>
            <ul className="ml-4 text-gray-600 space-y-2">
                <Link to={'/admin/orders'}>
              <li className='flex items-center gap-2'><FaCartArrowDown /> All Orders</li>
                </Link>
            </ul>

            <li className="font-semibold text-gray-700">Reviews</li>
            <ul className="ml-4 text-gray-600 space-y-2">
                <Link to={'/admin/reviewsId'}>
              <li className='flex items-center gap-2'><FaStar /> All Reviews</li>
                </Link>
            </ul>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10">
          <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-xl p-6">

              <h3 className="text-xl font-semibold">Total Products</h3>
              <p className="mt-2 text-gray-600 text-4xl font-bold">52</p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6">
              <h3 className="text-xl font-semibold">Total Orders</h3>
              <p className="mt-2 text-gray-600 text-4xl font-bold">52</p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6">
              <h3 className="text-xl font-semibold">Total Reviews</h3>
              <p className="mt-2 text-gray-600 text-4xl font-bold">52</p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6">
              <h3 className="text-xl font-semibold">Out of Stock</h3>
              <p className="mt-2 text-gray-600 text-4xl font-bold">52</p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6">
              <h3 className="text-xl font-semibold">In Stock</h3>
              <p className="mt-2 text-gray-600 text-4xl font-bold">52</p>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;
