import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Rating from '../components/Rating';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { createReview, getProductDetails, removeErrors } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { addItemsToCart, removeMessage } from '../features/cart/cartSlice';
import PageTitle from '../components/PageTitle';
import { removeSuccess } from '../features/user/userSlice';

function ProductDetails() {
  const [UserRating, setUserRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartLoading, setCartLoading] = useState(false);
  const [comment, setComment] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, product, reviewSuccess, reviewLoading } = useSelector((state) => state.product);
  const { error: cartError, success, message } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      toast.success('One removed successfully', { position: 'top-center', autoClose: 3000 });
    } else {
      toast.error('Cannot be less than 1', { position: 'top-center', autoClose: 3000 });
    }
  };

  const increaseQuantity = () => {
    if (product.stock <= quantity) {
      toast.error('Cannot exceed available stock', { position: 'top-center', autoClose: 3000 });
      dispatch(removeErrors());
      return;
    }
    toast.success('One item added successfully', { position: 'top-center', autoClose: 3000 });
    setQuantity(quantity + 1);
  };

  const addToCart = () => {
    setCartLoading(true);
    setTimeout(() => {
      setCartLoading(false);
      toast.success('Item added successfully', { position: 'top-center', autoClose: 3000 });
    }, 1000);
    dispatch(addItemsToCart({ id, quantity }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!UserRating) {
      toast.error('Please select a rating', { position: 'top-center', autoClose: 3000 });
      return;
    }
    dispatch(createReview({ rating: UserRating, comment, productId: id }));
  };

  useEffect(() => {
    if (id) dispatch(getProductDetails(id));
    return () => {
      dispatch(removeErrors());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || error, { position: 'top-center', autoClose: 3000 });
      dispatch(removeErrors());
    }
    if (cartError) {
      toast.error(cartError, { position: 'top-center', autoClose: 3000 });
    }
  }, [dispatch, error, cartError]);

  useEffect(() => {
    if (success) {
      toast.success(message, { position: 'top-center', autoClose: 3000 });
      dispatch(removeMessage());
    }
  }, [dispatch, success, message]);

  useEffect(() => {
    if (reviewSuccess) {
      toast.success('Review submitted successfully', { position: 'top-center', autoClose: 3000 });
      setUserRating(0);
      setComment('');
      dispatch(removeSuccess());
      dispatch(getProductDetails(id));
    }
  }, [reviewSuccess, id, dispatch]);

  useEffect(() => {
    if (product?.image?.length > 0) {
      setSelectedImage(product.image[0].url);
    }
  }, [product]);


  const handleCopyId = () => {
    navigator.clipboard.writeText(product._id);
    toast.success('Product ID Copied!', { position: 'top-center', autoClose: 2000 });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Loader />
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <PageTitle title="Product Details" />
        <Navbar />
        <div className="text-center text-red-500 py-10">Error loading product.</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <PageTitle title={`${product.title} - Details`} />
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 bg-white shadow-md rounded-lg p-6">
          {/* Product Image */}
          <div className="md:w-1/2 flex justify-center items-center">
            <img
              src={selectedImage?.replace('./', '/')}
              alt={product.title}
              className="rounded-lg max-h-96 object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-semibold text-gray-800">{product.title}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-xl font-bold text-orange-600">Price: ₹ {product.price}</p>

            <div className="flex items-center gap-2">
              <Rating value={product.ratings} disabled={true} onRatingChange={handleRatingChange} />
              <span className="text-gray-500">({product.ratings})</span>
            </div>

            <span className="text-gray-500">({product.numberOfReviews}) Reviews</span>

            <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0
                ? `In Stock (${product.stock} available)`
                : 'Out of Stock'}
            </span>

            {product.stock > 0 && (
              <>
                {(!user || user.role !== 'admin') ? (
                  <>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">Quantity:</span>
                      <button className="bg-gray-200 px-3 py-1 rounded" onClick={decreaseQuantity}>-</button>
                      <input
                        type="text"
                        value={quantity}
                        readOnly
                        className="w-12 text-center border rounded"
                      />
                      <button className="bg-gray-200 px-3 py-1 rounded" onClick={increaseQuantity}>+</button>
                    </div>

                    <button
                      className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded shadow"
                      onClick={addToCart}
                      disabled={cartLoading}
                    >
                      {cartLoading ? 'Adding...' : 'Add to Cart'}
                    </button>
                  </>
                ) : (
                  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mt-6">
                    <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                      <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">Admin Controls</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-5">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Product ID</p>
                        <div className="flex items-center gap-2">
                          <p className="font-mono text-gray-800 font-semibold truncate" title={product._id}>{product._id}</p>
                          <button
                            onClick={handleCopyId}
                            className="text-gray-400 hover:text-blue-600 transition-colors p-1 rounded hover:bg-blue-50"
                            title="Copy ID"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Stock Level</p>
                        <p className={`font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>{product.stock} Units</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Category</p>
                        <p className="font-medium text-gray-800">{product.category}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Created At</p>
                        <p className="font-medium text-gray-800">{new Date(product.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/admin/product/${product._id}`)}
                      className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-blue-200 shadow-lg flex items-center justify-center gap-2 group"
                    >
                      <span>Edit Product Details</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Write Review */}
        {/* Reviews Section - Hidden for Admins */}
        {(!user || user.role !== 'admin') && (
          <>
            <form
              onSubmit={handleReviewSubmit}
              className="mt-8 bg-white shadow-md rounded-lg p-6 space-y-4"
            >
              <h3 className="text-xl font-semibold text-gray-800">Write a Review</h3>
              <Rating value={UserRating} disabled={false} onRatingChange={handleRatingChange} />
              <textarea
                placeholder="Write your review here..."
                className="w-full border rounded p-2 focus:ring-2 focus:ring-orange-500 outline-none"
                value={comment}
                required
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-6 rounded shadow-md transition"
              >
                Submit Review
              </button>
            </form>

            <div className="mt-8 bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Customer Reviews</h3>
              {product.reviews?.length > 0 ? (
                <div className="space-y-4">
                  {product.reviews.map((review) => (
                    <div className="border-b border-gray-100 last:border-0 pb-4 last:pb-0" key={review._id}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold text-gray-600">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">{review.name}</p>
                          <Rating value={review.rating} disabled={true} size="small" />
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm pl-10">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>



      <Footer />
    </>
  );
}

export default ProductDetails;
