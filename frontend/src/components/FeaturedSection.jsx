import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../features/products/productSlice';
import Loader from './Loader';

const FeaturedSection = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.product);
    const [back, setBack] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        dispatch(getProduct({ page: 1 }));
    }, [dispatch]);

    const scrollLeft = () => {
        console.log(scrollRef);
    }

    if (loading) return <Loader />

    const featuredProducts = products && products.length > 0 ? products.slice(0, 5) : [];

    return (
        <div className=' w-full'>
            <h1 className='text-center p-5 font-extrabold text-3xl md:text-[3vw]'>Featured Collection</h1>
            <div className='relative mb-5'>
                <div className=' hidden md:flex justify-between w-full absolute top-[30%] -translate-y-1/2 px-4 z-10 text-white text-3xl'>
                    <IoIosArrowBack ref={scrollRef} onClick={scrollLeft} className='bg-[#121212] cursor-pointer p-1 ' />
                    <IoIosArrowForward className=' bg-[#121212] cursor-pointer p-1 ' />
                </div>
                {/* responsive container */}
                <div className='flex gap-4 overflow-x-auto no-scrollbar relative w-full h-auto pb-4'>
                    {featuredProducts.length === 0 ? <p className='w-full text-center'>No products found</p> :
                        featuredProducts.map((product, idx) => (
                            <Link to={`/product/${product._id}`} key={product._id || idx} className='w-[40vw] md:w-[20vw] shrink-0'>
                                <div className='w-full shrink-0'
                                    onMouseEnter={() => setBack(idx)}
                                    onMouseLeave={() => setBack(null)}>
                                    <div className='w-full h-[45vw] md:h-[25vw] shrink-0 relative hover:scale-105 transition-transform duration-300 ease-in-out overflow-hidden group'>
                                        <p className=' absolute bg-black font-bold text-white p-1  ml-1 mt-1 text-sm'>0</p>
                                        <FaEye className='absolute bottom-0 text-white bg-[#121212] p-1 text-2xl group' />
                                        {back === idx && product.image && product.image.length > 1 ?
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
                        ))}
                </div>
            </div>

            <div className='w-full flex flex-col md:flex-row shadow-lg mt-10'>
                <div className='w-full md:w-[60%] h-[300px] md:h-[400px]'>
                    <img src="https://i.pinimg.com/736x/2d/54/b0/2d54b08629727a6d93cc3ae7abd9572c.jpg" alt=""
                        className='w-full h-full object-cover'
                    />
                </div>
                <div className='w-full md:w-[40%] bg-white flex flex-col justify-center items-center text-center p-8 md:p-12 border border-gray-200'>
                    <p className='uppercase text-xl md:text-2xl font-bold mb-3 md:mb-5'>Big sale</p>
                    <p className='text-lg md:text-xl text-gray-700'>The best collection of the week</p>
                    <Button
                        text="Shop The Collection"
                        className="mt-6 border-black hover:bg-black px-8 py-3 text-black hover:text-white"
                    />
                </div>
            </div>
        </div>
    );
}

export default FeaturedSection;
