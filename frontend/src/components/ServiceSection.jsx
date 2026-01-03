import React from 'react';
import Button from './Button';
import { CiDeliveryTruck } from "react-icons/ci";
import { Ri24HoursFill } from "react-icons/ri";
import { HiOutlineSpeakerphone } from "react-icons/hi";

const ServiceSection = () => {
    return (
        <>
            <div className='w-full p-10'>
                <div className='w-full flex flex-col md:flex-row shadow-lg mt-10'>
                    <div className='w-full md:w-[40%] bg-gray-100 flex flex-col justify-center items-center text-center p-8 md:p-12'>
                        <p className='uppercase text-xl md:text-2xl font-bold mb-3 md:mb-5'>Exclusive Service</p>
                        <p className='text-gray-900 mt-2 mb-6 text-sm md:text-base'>All the online shopping services available during the holiday season</p>
                        <Button text="Shop The Collection" />
                    </div>
                    <div className='w-full md:w-[60%] h-[300px] md:h-[400px] bg-black relative'>
                        <video src='https://v1.pinimg.com/videos/mc/720p/c2/eb/bb/c2ebbb42c65b5ad2440f608c52743d0a.mp4'
                            className='w-full h-full object-cover'
                            autoPlay loop muted />
                    </div>
                </div>

                {/* ours services */}
                <div className=' mt-5 grid grid-cols-1 md:grid-cols-3 gap-8 px-5 md:px-20'>
                    <div className='flex flex-col items-center text-center'>
                        <CiDeliveryTruck className='text-4xl md:text-5xl font-light text-[#121212] mb-2' />
                        <p className='font-bold text-[#121212] text-lg'>Free shipping</p>
                        <p className='text-sm text-gray-500'>Free shipping world wide</p>
                    </div>
                    <div className='flex flex-col items-center text-center'>
                        <Ri24HoursFill className='text-4xl md:text-5xl font-light text-[#121212] mb-2' />
                        <p className='font-bold text-[#121212] text-lg'>24X7 service</p>
                        <p className='text-sm text-gray-500'>Online service for new customer</p>
                    </div>
                    <div className='flex flex-col items-center text-center'>
                        <HiOutlineSpeakerphone className='text-4xl md:text-5xl font-light text-[#121212] mb-2' />
                        <p className='font-bold text-[#121212] text-lg'>Festival offer</p>
                        <p className='text-sm text-gray-500'>New online special festival offer</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ServiceSection;
