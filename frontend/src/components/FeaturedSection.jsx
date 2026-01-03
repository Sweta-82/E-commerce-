import React, { useState, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaEye, FaArrowRight } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";
import { Link } from 'react-router-dom';

const FeaturedSection = () => {
    const ProductsData = [
        {
            _id: 1,
            title: "Double the Warmth Girl's Fashion Jacket",
            price: "$249.00",
            sizes: ["S", "M"],
            ratings: 4.5,
            img: "https://i.pinimg.com/1200x/3e/24/b7/3e24b7db916793d5959ca7be0d31bc52.jpg",
            back: 'https://i.pinimg.com/1200x/4f/97/66/4f97660788138baf9437286409b79deb.jpg',
            thumbnails: [
                "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg",
                "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg",
                "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg",
                "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg"
            ],
        },
    ];

    const [back, setBack] = useState(null);
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        console.log(scrollRef);
    }

    return (
        <div className=' w-full p-10'>
            <h1 className='text-center p-5 font-extrabold text-[3vw]'>Featured Collection</h1>
            <div className='relative mb-5'>
                <div className=' hidden sm:flex  justify-between w-full absolute top-[30%] -translate-y-1/2 px-4 z-10 text-white text-3xl'>
                    <IoIosArrowBack ref={scrollRef} onClick={scrollLeft} className='bg-[#121212] cursor-pointer p-1 ' />
                    <IoIosArrowForward className=' bg-[#121212] cursor-pointer p-1 ' />
                </div>
                {/* <div className=' h-[40vw] mb-5 flex gap-4 overflow-x-auto no-scrollbar relative bg-green-600'> */}
                {ProductsData.map((product, idx) => (
                    <Link to={`${product._id}`} key={idx}>
                        <div className=' lg:-h-[25vw] w-[28vw]'
                            onMouseEnter={() => setBack(idx)}
                            onMouseLeave={() => setBack(null)}>
                            <div className=' w-[28vw] h-[30vw] shrink-0 relative hover:scale-105 transition-transform duration-300 ease-in-out overflow-hidden group'>
                                <p className=' absolute bg-black font-bold text-white p-1  ml-1 mt-1 text-sm'>0</p>
                                <FaEye className='absolute bottom-0 text-white bg-[#121212] p-1 text-2xl group' />
                                {back === idx ?
                                    <img
                                        src={product.back}
                                        className='object-cover w-full h-full  transition-transform duration-500'
                                    />
                                    :
                                    <img
                                        src={product.img}
                                        className='object-cover w-full h-full'
                                    />
                                }

                            </div>
                            <p className='text-[#121212] leading-3 mt-2'>{product.title}</p>
                            {product.price} <span className="line-through text-gray-500 text-sm">{product.oldPrice}</span>
                            <div className=' h-[3vw] w-[5vw] flex gap-2 mt-2'>

                                {product.thumbnails.map((e, idx) => (
                                    <img key={idx} src={e} alt=""
                                        className=' w-full h-full object-cove outline'
                                    />
                                ))}
                            </div>

                            <div className=' w-full flex flex-wrap gap-2 mt-2 mb-2'>
                                {/* <p className='bg-[#121212] p-2 text-white'>S</p> */}
                                {product.sizes.map((size, idx) => (
                                    <span key={idx} className='border border-[#121212] px-2 hover:bg-black hover:text-white '>{size}</span>
                                ))}
                            </div>
                            <button className=" bg-[#121212] text-white px-10 py-3  group relative overflow-hidden bottom-0 ">
                                <span className="inline-block transform transition-transform duration-500 group-hover:-translate-x-2">
                                    Add To Cart
                                    <IoBagAdd className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </span>
                            </button>
                        </div>
                    </Link>
                ))}
                {/* </div> */}
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
                    <button className="mt-6 border border-black hover:bg-black px-8 py-3 group overflow-hidden transition-all duration-300">
                        <span className="inline-block text-black group-hover:text-white transform transition-transform duration-500 group-hover:-translate-x-2 flex items-center gap-2">
                            Shop The Collection
                            <FaArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FeaturedSection;
