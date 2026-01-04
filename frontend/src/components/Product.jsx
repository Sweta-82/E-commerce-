import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { FaEye } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";

function Product({ product }) {
  const [back, setBack] = useState(false);

  return (
    <Link to={`/product/${product._id}`}>
      <div className='w-full shrink-0'
        onMouseEnter={() => setBack(true)}
        onMouseLeave={() => setBack(false)}>
        <div className='w-full h-[40vw] sm:h-[40vw] md:h-[19vw] shrink-0 relative hover:scale-105 transition-transform duration-300 ease-in-out overflow-hidden group'>
          <p className=' absolute bg-black font-bold text-white p-1  ml-1 mt-1 text-sm'>0</p>
          <FaEye className='absolute bottom-0 text-white bg-[#121212] p-1 text-2xl group' />
          {back && product.image && product.image.length > 1 ?
            <img
              src={product.image[1].url}
              alt={product.title}
              className='object-cover w-full h-full object-top transition-transform duration-500'
            />
            :
            <img
              src={product.image && product.image.length > 0 ? product.image[0].url : "https://via.placeholder.com/300"}
              alt={product.title}
              className='object-cover w-full h-full object-top'
            />
          }

        </div>
        <p className='text-[#121212] font-bold text-sm md:text-base mt-3 mb-1 line-clamp-2 leading-tight uppercase'>{product.title}</p>
        <p className='text-gray-500 text-[12px] line-clamp-2 leading-tight mt-1'>{product.description}</p>
        <p className='text-gray-700 mt-1'>₹{product.price}</p>
        <div className='flex gap-2 mt-2 h-10 md:h-[3vw]'>

          {product.image && product.image.slice(0, 4).map((e, idx) => (
            <img key={idx} src={e.url} alt=""
              className='h-full aspect-square object-cover outline'
            />
          ))}
        </div>

        <div className=' w-full flex flex-wrap gap-1 mt-2 mb-2'>
          {/* show all sizes, highlight available one */}
          {["S", "M", "L", "XL", "XXL"].map((size, idx) => {
            const isAvailable = product.size.includes(size);
            return (
              <span
                key={idx}
                className={`border px-2 text-xs transition-colors duration-200
                  ${isAvailable
                    ? 'bg-black text-white border-black font-bold'
                    : 'text-gray-400 border-gray-200 bg-gray-50'
                  }`}
              >
                {size}
              </span>
            );
          })}
        </div>
        <Button
          text="Add To Cart"
          Icon={IoBagAdd}
          className="bg-[#121212] active:text-white px-10 py-3 w-full bottom-0 border-none !mt-0 text-white"
        />
      </div>
    </Link>
  );
}

export default Product;
