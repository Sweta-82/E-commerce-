import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import Button from './Button';

function Product({ product }) {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    console.log(`Rating changed to ${newRating}`);
  };

  // Safely get first image URL (Backend uses 'image' singular for array)
  const productImage = product.image && product.image.length > 0
    ? product.image[0].url
    : '/path/to/default-image.jpg'; // fallback image

  return (
    <Link to={`/product/${product._id}`}>
      <div className="w-60 bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition duration-300">
        <div className="w-full h-60">
          <img
            src={productImage}
            alt={product.name || 'Product'}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between">
          <h3 className="text-lg font-semibold mb-2">{product.title || product.name}</h3>
          <div className="rating flex justify-between">
            <Rating
              value={product.ratings || 0}
              onRatingChange={handleRatingChange}
              disable={true}
            />
            <span className="text-gray-500">
              ({product.numberOfReviews || 0}{' '}
              {product.numberOfReviews === 1 ? 'Review' : 'Reviews'})
            </span>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-gray-800 font-bold text-lg">₹ {product.price}</span>
            <Button
              text="View Details"
              className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-1.5 rounded border-none !mt-0"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Product;
