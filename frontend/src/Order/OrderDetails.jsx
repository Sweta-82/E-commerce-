import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getOrderDetails, removeErrors } from '../features/order/orderSlice';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import { toast } from 'react-toastify';

function OrderDetails() {
    const { order, loading, error } = useSelector((state) => state.order);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getOrderDetails(id));

        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors());
        }
    }, [dispatch, id, error]);

    if (loading) return <Loader />;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-[#121212]">
            <PageTitle title="Order Details" />
            <Navbar />

            <div className="flex-grow max-w-6xl mx-auto w-full px-4 md:px-8 py-10">
                <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight mb-8 text-center md:text-left">
                    Order Details
                </h1>

                {order && (
                    <div className="flex flex-col gap-8">
                        {/* Order Header Info */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                                <p className="text-lg font-bold text-black font-mono">#{order._id}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Placed On</p>
                                <p className="text-gray-700 font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="flex flex-col items-start md:items-end">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order Status</p>
                                <p className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                                    {order.orderStatus}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Shipping Info */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <h2 className="text-xl font-bold uppercase mb-6 border-b border-gray-100 pb-4">Shipping Info</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Name</p>
                                            <p className="font-semibold">{order.user && order.user.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Phone</p>
                                            <p className="font-semibold">{order.shippingInfo && order.shippingInfo.phoneNo}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Address</p>
                                            <p className="font-semibold text-gray-700">
                                                {order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <h2 className="text-xl font-bold uppercase mb-6 border-b border-gray-100 pb-4">Payment</h2>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Status</p>
                                            <p className={`font-bold ${order.paymentInfo && order.paymentInfo.status === 'succeeded' ? 'text-green-600' : 'text-red-600'}`}>
                                                {order.paymentInfo && order.paymentInfo.status === 'succeeded' ? 'PAID' : 'NOT PAID'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Amount</p>
                                            <p className="font-bold text-gray-700">₹{order.totalPrice}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-fit">
                                <h2 className="text-xl font-bold uppercase mb-6 border-b border-gray-100 pb-4">Order Items</h2>
                                <div className="space-y-6">
                                    {order.orderItems && order.orderItems.map((item) => (
                                        <div key={item.product} className="flex gap-4 items-center">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md border border-gray-200" />
                                            <div>
                                                <Link to={`/product/${item.product}`} className="text-sm font-bold uppercase hover:underline line-clamp-1 block">
                                                    {item.name}
                                                </Link>
                                                <div className="flex gap-2 text-xs mt-1">
                                                    <span className="text-gray-500 font-medium">₹{item.price}</span>
                                                    <span className="text-gray-400">x {item.quantity}</span>
                                                </div>
                                                <p className="text-sm font-bold mt-1 text-black">₹{item.price * item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default OrderDetails;
