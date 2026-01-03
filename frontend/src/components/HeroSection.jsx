import React from 'react';
import Button from './Button';

const HeroSection = () => {
    return (
        <div className='bg-black w-full h-screen relative'>
            <img src="https://i.pinimg.com/1200x/3a/e2/c6/3ae2c625afd99ca272a439cf73cb17fe.jpg" alt=""
                className='w-full h-screen object-cover '
            />

            <div className='  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-100 w-screen p-10 text-center sm:text-start'>
                <h1 className='  text-[8vw] font-bold tracking-tighter sm:leading-[12vw] whitespace-normal leading-[8vw]'>Spring summer collection</h1>
                <h1 className=' text-2xl pt-10 '>Finest Wrinkle Free Collection</h1>
                <h1 className='pt-2 leading-3 text-sm tracking-tight'>Oversize fit collared shirt. Long sleeves with buttoned cuffs. Chest patch pocket.</h1>
                <Button
                    text="Shop Now"
                    className="mt-8 bg-white hover:!text-white hover:!bg-black px-10 py-3 text-black border-none"
                />
            </div>

        </div>
    );
}

export default HeroSection;
