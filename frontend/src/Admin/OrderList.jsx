import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import Loader from '../components/Loader';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit } from 'react-icons/fa';

import GenericPagination from '../components/GenericPagination';

function OrderList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchOrders = async (page = 1) => {
        try {
            const { data } = await axios.get(`/api/v1/admin/orders?page=${page}`);
            setOrders(data.orders);
            const count = data.ordersCount || data.orders.length; // Fallback if count missing
            const perPage = data.resultPerPage || 8;
            setTotalPages(Math.ceil(count / perPage));
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch orders');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await axios.delete(`/api/v1/admin/order/${id}`);
                toast.success('Order Deleted Successfully');
                fetchOrders();
            } catch (error) {
                toast.error(error.response?.data?.message || 'Delete Failed');
            }
        }
    };

    if (loading) return <Loader />;

    return (
        <>
            <Navbar />
            <PageTitle title="All Orders" />
            <div className="bg-gray-100 min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-3xl font-bold mb-6 text-[#1e2939]">All Orders</h1>

                    {orders.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500 text-lg">No Orders Found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 border border-[#fff001]">
                                <thead className="bg-[#fff001] text-black">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Order ID</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Items Qty</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Amount</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Date</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orders.map((order) => (
                                        <tr key={order._id}>
                                            <td className="px-4 py-4 text-sm font-mono">{order._id}</td>
                                            <td className="px-4 py-4 text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                    order.orderStatus === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {order.orderStatus}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-sm">{order.orderItems.length}</td>
                                            <td className="px-4 py-4 text-sm font-bold">₹{order.totalPrice}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500">{new Date(order.createAt).toLocaleDateString()}</td>
                                            <td className="px-4 py-4 text-sm space-x-2 flex">
                                                {/* Edit Order Link */}
                                                <Link to={`/admin/order/${order._id}`}>
                                                    <FaEdit className="text-blue-500 hover:text-blue-700" />
                                                </Link>
                                                <button onClick={() => handleDelete(order._id)} className="text-red-500 hover:text-red-700">
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <GenericPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default OrderList;
