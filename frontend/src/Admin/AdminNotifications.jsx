import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaUser, FaClock } from 'react-icons/fa';

const AdminNotifications = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data } = await axios.get('/api/v1/admin/orders/notifications');
                // Sort orders by most recent first
                const sortedOrders = data.orders.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
                setOrders(sortedOrders);
                setLoading(false);
            } catch (error) {
                toast.error('Failed to load notifications');
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <>
            <PageTitle title="Admin Notification" />
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-10 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
                        New Order Notifications
                    </h1>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <p className="text-gray-500 text-lg">No new orders found for your products.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div
                                    key={order._id}
                                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border-l-4 border-blue-500"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                New Order #{order._id.substring(0, 8)}
                                            </h3>
                                            <div className="flex items-center text-gray-600 mb-2">
                                                <FaUser className="mr-2 text-sm" />
                                                <span className="font-medium">Placed by User ID: {order.user}</span>
                                            </div>
                                            <div className="flex items-center text-gray-500 text-sm">
                                                <FaClock className="mr-2" />
                                                {new Date(order.createAt).toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-2xl font-bold text-green-600">
                                                ₹{order.totalPrice}
                                            </span>
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                    order.orderStatus === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {order.orderStatus}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <p className="text-gray-700 font-medium mb-2">Items Ordered:</p>
                                        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                                            {order.orderItems.map((item, index) => (
                                                <li key={index}>
                                                    {item.name} x {item.quantity}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AdminNotifications;
