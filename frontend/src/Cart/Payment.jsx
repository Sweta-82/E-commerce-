import React from 'react'
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutPath from "./CheckoutPath";
import { Link } from 'react-router-dom';

function Payment() {
  const orderItem=JSON.parse(sessionStorage.getItem('oderItems'))
  return (
    <>
      <PageTitle title={'Payment'} />
      <Navbar />
      <CheckoutPath activePath={2} />

      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Choose Your Payment Method</h2>

        <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md text-center">
          <Link
            to="/order/conform"
            className="inline-block text-blue-600 hover:underline mb-6"
          >
            Go Back
          </Link>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-300"
          >
            Pay ₹({orderItem.total}) /-
          </button>
        </div>
      </div>
      <Footer />

    </>
  )
}

export default Payment;
