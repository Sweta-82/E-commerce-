import React from 'react'
import Button from '../components/Button'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartItem from './CartItems'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function Cart() {
    const { cartItems } = useSelector(state => state.cart)
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const tax = subtotal * 0.18
    const shippingCharges = subtotal > 500 ? 0 : 50
    const total = subtotal + tax + shippingCharges;
    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate(`/login?redirect=/shipping`)
    }

    return (
        <>
            <Navbar />
            <PageTitle title="Your Cart" />

            {cartItems.length === 0 ? (
                <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
                    <p className="text-xl font-semibold text-gray-700 mb-4">Your cart is empty</p>
                    <Link
                        to="/products"
                        className="text-white bg-black hover:bg-gray-800 px-5 py-2 rounded-md transition"
                    >
                        View Products
                    </Link>
                </div>
            ) : (
                <div className="min-h-screen bg-gray-100 p-6 flex flex-col lg:flex-row gap-6">
                    {/* Cart Items */}
                    <div className="w-full lg:w-3/4 bg-white rounded-xl shadow p-6">
                        <h2 className="text-2xl font-bold mb-4 border-b pb-2">Your Cart</h2>
                        <div className="hidden lg:grid grid-cols-4 text-gray-700 font-semibold border-b pb-2">
                            <div>Product</div>
                            <div>Quantity</div>
                            <div>Item Total</div>
                            <div>Actions</div>
                        </div>
                        <div>
                            {cartItems.map(item => (
                                <CartItem item={item} key={item.name} />
                            ))}
                        </div>
                    </div>

                    {/* Price Summary */}
                    <div className="w-full lg:w-1/4 bg-white rounded-xl shadow p-6">
                        <h3 className="text-xl font-bold mb-4">Price Summary</h3>
                        <div className="space-y-3 text-gray-700">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax (18%):</span>
                                <span>₹{tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping:</span>
                                <span>₹{shippingCharges}</span>
                            </div>
                            <hr />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total:</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                        <Button
                            onClick={checkoutHandler}
                            text="Proceed to Checkout"
                            className="w-full mt-6 bg-black hover:bg-gray-800 text-white py-2 rounded-md transition border-none"
                        />
                    </div>
                </div>
            )}
            <Footer />
        </>
    )
}

export default Cart
