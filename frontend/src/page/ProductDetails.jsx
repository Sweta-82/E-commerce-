import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Rating from '../components/Rating';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
                  <p className="mt-4 text-red-500 font-medium border border-red-500 p-2 rounded max-w-max">
                    Admin accounts cannot place orders.
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Write Review */}
        <form
          onSubmit={handleReviewSubmit}
          className="mt-8 bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          <h3 className="text-xl font-semibold text-gray-800">Write a Review</h3>
          <Rating value={UserRating} disabled={false} onRatingChange={handleRatingChange} />
          <textarea
            placeholder="Write your review here..."
            className="w-full border rounded p-2"
            value={comment}
            required
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Submit Review
          </button>
        </form>

        {/* Reviews */}
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Customer Reviews</h3>
          {product.reviews?.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div className="border-b pb-2" key={review._id}>
                  <Rating value={review.rating} disabled={true} />
                  <p className="text-gray-700">{review.comment}</p>
                  <p className="text-sm text-gray-500">By: {review.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetails;
