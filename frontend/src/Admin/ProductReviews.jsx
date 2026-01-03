import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // Corrected import
import PageTitle from '../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews, deleteReviews, removeErrors, removeSuccess } from '../features/products/productSlice';
import Loader from '../components/Loader';
import { FaTrash } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';

function ProductReviews() {
    const dispatch = useDispatch();
    const { error, reviews, loading, isDeleted } = useSelector(state => state.product);
    const [productId, setProductId] = useState('');

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
    };

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviews({ reviewId, productId }));
    };

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(removeErrors());
        }
        if (isDeleted) {
            alert('Review Deleted Successfully');
            dispatch(removeSuccess());
            dispatch(getAllReviews(productId)); // Refresh reviews after deletion
        }
    }, [dispatch, error, isDeleted, productId]);

    return (
        <>
            <Navbar />
            <PageTitle title="All Reviews - Admin" />
            <div className="bg-gray-100 min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-xl rounded-2xl p-8">

                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Product Reviews Management</h1>
                        <p className="text-gray-500">Search by Product ID to manage reviews</p>
                    </div>

                    <div className="flex justify-center mb-8">
                        <form className="w-full max-w-md flex shadow-sm rounded-lg overflow-hidden" onSubmit={productReviewsSubmitHandler}>
                            <input
                                type="text"
                                placeholder="Enter Product ID"
                                className="flex-1 p-3 border-none outline-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-700"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                            <Button
                                type="submit"
                                text="Search"
                                className="!mt-0 rounded-none h-full"
                                disabled={loading || productId === ''}
                            />
                        </form>
                    </div>

                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="overflow-x-auto rounded-lg border border-gray-100">
                            {reviews && reviews.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-[#fff001] text-gray-900">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Review ID</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">User</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Comment</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Rating</th>
                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {reviews.map((review) => (
                                            <tr key={review._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{review._id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{review.name}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{review.comment}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${review.rating >= 4 ? 'bg-green-100 text-green-800' : review.rating >= 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                                        {review.rating} <FaStar size={10} />
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button
                                                        onClick={() => deleteReviewHandler(review._id)}
                                                        className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full hover:bg-red-100 transition-all"
                                                        title="Delete Review"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center py-12 text-gray-400">
                                    {productId ? "No Reviews Found for this Product" : "Enter a Product ID to view reviews"}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProductReviews;
