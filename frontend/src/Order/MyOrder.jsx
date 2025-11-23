import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMyOrder, removeErrors } from '../features/order/orderSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { MdLaunch } from "react-icons/md";

function MyOrders() {
    const { orders, loading, error } = useSelector(state => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMyOrder());
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors());
        }
    }, [dispatch, error]);

    return (
        <>
            <Navbar />
            <PageTitle title="User Order" />

            {loading ? (
                <Loader />
            ) : orders.length > 0 ? (
                <div className="min-h-screen px-4 py-10 bg-gray-100">
                    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">My Orders</h1>
                    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                        <table className="min-w-full table-auto text-sm text-left">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-6 py-3">Order ID</th>
                                    <th className="px-6 py-3">Items Count</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Total Price</th>
                                    <th className="px-6 py-3 text-center">View</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {orders.map(order => (
                                    <tr key={order._id} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">{order._id}</td>
                                        <td className="px-6 py-4">{order.orderItems.length}</td>
                                        <td className="px-6 py-4">{order.orderStatus}</td>
                                        <td className="px-6 py-4">₹{order.totalPrice}</td>
                                        <td className="px-6 py-4 text-center">
                                            <Link
                                                to={`/order/${order._id}`}
                                                className="text-blue-600 hover:text-blue-800 transition"
                                            >
                                                <MdLaunch />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <p className="text-xl font-medium text-gray-600">No Orders Found</p>
                </div>
            )}

            <Footer />
        </>
    );
}

export default MyOrders;
