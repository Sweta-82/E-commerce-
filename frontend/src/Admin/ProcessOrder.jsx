import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, removeErrors } from '../features/order/orderSlice';
import { updateOrder, resetUpdate } from '../features/admin/adminSlice';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { FaShippingFast, FaMapMarkerAlt, FaPhoneAlt, FaUser, FaBoxOpen, FaClipboardList, FaCheckCircle } from 'react-icons/fa';
import { MdPayment, MdAttachMoney } from 'react-icons/md';
import Button from '../components/Button';

function ProcessOrder() {
    const { order, error, loading } = useSelector((state) => state.order);
    const { error: updateError, isUpdated, loading: updateLoading } = useSelector((state) => state.admin);

    const dispatch = useDispatch();
    const { id } = useParams();

    const [status, setStatus] = useState('');

    useEffect(() => {
        dispatch(getOrderDetails(id));

        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors());
        }

        // Cleanup to avoid showing stale errors
        return () => { dispatch(removeErrors()) }
    }, [dispatch, id, error]);

    useEffect(() => {
        if (updateError) {
            toast.error(updateError, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors());
        }
        if (isUpdated) {
            toast.success('Order Updated Successfully', { position: 'top-center', autoClose: 3000 });
            dispatch(resetUpdate());
            dispatch(getOrderDetails(id));
        }
    }, [dispatch, updateError, isUpdated, id]);

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(updateOrder({ id, orderData: { status } }));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Processing': return 'text-orange-500 bg-orange-100';
            case 'Shipped': return 'text-blue-500 bg-blue-100';
            case 'Delivered': return 'text-green-500 bg-green-100';
            default: return 'text-gray-500 bg-gray-100';
        }
    };

    return (
        <>
            <Navbar />
            <PageTitle title={`Process Order #${id ? id.slice(0, 8) : ''}`} />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? <Loader /> : (!order || !order._id) ? (
                        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                            <FaClipboardList className="text-6xl text-gray-300 mb-4" />
                            <h2 className="text-2xl font-bold text-gray-600">Order not found</h2>
                            <Link to="/admin/orders" className="mt-4 text-blue-500 hover:underline">Back to Orders</Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Left Column: Order Details */}
                            <div className="lg:col-span-2 space-y-8">

                                {/* Status Header */}
                                <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-100">
                                    <div>
                                        <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
                                            Order #{order._id && order._id.slice(0, 10)}...
                                        </h1>
                                        <p className="text-sm text-gray-500 mt-1">Placed on {order.createdAt && new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className={`mt-4 sm:mt-0 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 ${getStatusColor(order.orderStatus)}`}>
                                        <div className={`w-2 h-2 rounded-full ${order.orderStatus === 'Delivered' ? 'bg-green-500' : order.orderStatus === 'Shipped' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                                        {order.orderStatus}
                                    </div>
                                </div>

                                {/* Shipping Info Card */}
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                                        <FaShippingFast className="text-blue-500" /> Shipping Details
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-3">
                                                <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><FaUser /></div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Customer</p>
                                                    <p className="font-semibold text-gray-800">{order.user && order.user.name}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><FaPhoneAlt /></div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Phone</p>
                                                    <p className="font-semibold text-gray-800">{order.shippingInfo && order.shippingInfo.phoneNumber}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><FaMapMarkerAlt /></div>
                                            <div>
                                                <p className="text-sm text-gray-500">Address</p>
                                                <p className="font-medium text-gray-800 leading-relaxed">
                                                    {order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}`}
                                                    <br />
                                                    {order.shippingInfo && `${order.shippingInfo.state}, ${order.shippingInfo.pinCode}`}
                                                    <br />
                                                    {order.shippingInfo && order.shippingInfo.country}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Info Card */}
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                                        <MdPayment className="text-green-500" /> Payment Information
                                    </h2>
                                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${order.paymentInfo && order.paymentInfo.status === "succeeded" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                                                {order.paymentInfo && order.paymentInfo.status === "succeeded" ? <FaCheckCircle /> : <MdAttachMoney />}
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Status</p>
                                                <p className={`font-bold ${order.paymentInfo && order.paymentInfo.status === "succeeded" ? "text-green-600" : "text-red-600"}`}>
                                                    {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "UNPAID"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Total Amount</p>
                                            <p className="text-xl font-bold text-gray-900">₹{order.totalPrice}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items Card */}
                                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                                        <FaBoxOpen className="text-orange-500" /> Order Items ({order.orderItems?.length})
                                    </h2>
                                    <div className="space-y-4">
                                        {order.orderItems && order.orderItems.map((item) => (
                                            <div key={item.product} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                                                <div className="flex items-center gap-4">
                                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md border border-gray-200" />
                                                    <div>
                                                        <Link to={`/product/${item.product}`} className="font-semibold text-gray-800 hover:text-black transition-colors line-clamp-1">{item.name}</Link>
                                                        <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                    <p className="font-bold text-gray-800">₹{item.quantity * item.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            {/* Right Column: Process Action */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-24">
                                    <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                                        <FaClipboardList className="text-purple-500" /> Process Order
                                    </h2>

                                    <form onSubmit={updateOrderSubmitHandler} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                                            <div className="relative">
                                                <select
                                                    className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-purple-500 transition-colors cursor-pointer"
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    value={status}
                                                >
                                                    <option value="">Choose Status...</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            text={updateLoading ? 'Processing...' : 'Update Status'}
                                            type="submit"
                                            Icon={FaCheckCircle}
                                            disabled={loading || status === "" || updateLoading}
                                            className={`w-full ${loading || status === "" || updateLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                                        />

                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <p className="text-xs text-gray-400 text-center">
                                                Update status carefully. This action will trigger notifications to the user.
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default ProcessOrder;
