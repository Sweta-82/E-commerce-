import React from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import CheckoutPath from './CheckoutPath';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { json } from 'express';

function OrderConform() {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const tax = subtotal * 0.18
    const shippingCharges = subtotal > 500 ? 0 : 50
    const total = subtotal + tax + shippingCharges;
    const navigate = useNavigate();

    const handleProceedToPayment=()=>{
        const data={
            subtotal,
            tax,
            shippingCharges,
            total
        }
        sessionStorage.setItem('oderItems',JSON.stringify(data))
        navigate('/process/payment')
    }
  return (
    <>
      <PageTitle title={'Order Confirm'} />
      <Navbar />
      <CheckoutPath activePath={1} />

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">Order Confirmation</h1>

        {/* Shipping Details Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md rounded-lg">
            <caption className="caption-top text-xl font-semibold text-left p-2">Shipping Details</caption>
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Address</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td className="border p-2">{user?.name}</td>
                <td className="border p-2">{shippingInfo?.phoneNumber}</td>
                <td className="border p-2">
                  {shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.state}, {shippingInfo?.country} - {shippingInfo?.pinCode}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* cartitms */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md rounded-lg">
            <caption className="caption-top text-xl font-semibold text-left p-2">Cart Items</caption>
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="border p-2">Image</th>
                <th className="border p-2">Product Name</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Total Price</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {cartItems.map((item) => (
                <tr key={item.product}>
                  <td className="border p-2">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">₹{item.price}</td>
                  <td className="border p-2">{item.quantity}</td>
                  <td className="border p-2">₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* order */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md rounded-lg">
            <caption className="caption-top text-xl font-semibold text-left p-2">Order Summary</caption>
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="border p-2">Subtotal</th>
                <th className="border p-2">Shipping Charges</th>
                <th className="border p-2">GST</th>
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td className="border p-2">₹ {subtotal} /-</td>
                <td className="border p-2">₹ {shippingCharges} /-</td>
                <td className="border p-2">₹ {tax} /-</td>
                <td className="border p-2">₹ {total} /-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-center">
          <button
            onClick={handleProceedToPayment}
            className="mt-3 px-6 py-3 bg-blue-700 text-white rounded-lg text-lg font-medium hover:bg-blue-800 transition duration-300"
          >
            Proceed to Payment
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default OrderConform;
