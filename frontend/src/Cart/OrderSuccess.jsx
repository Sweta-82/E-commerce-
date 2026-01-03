import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function OrderSuccess() {
    return (
        <>
            <PageTitle title={"Order Success"} />
            <Navbar />

            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-20">
                <div className="bg-white p-10 rounded-3xl shadow-lg flex flex-col items-center max-w-lg w-full text-center">

                    <FaCheckCircle className="text-green-500 text-6xl mb-6" />

                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Order Placed Successfully!
                    </h2>

                    <p className="text-gray-600 mb-8 text-lg">
                        Thank you for your purchase. You can check the status of your order in your dashboard.
                    </p>

                    <Link
                        to="/orders/user"
                        className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-md transform hover:scale-105"
                    >
                        View Orders
                    </Link>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default OrderSuccess;
