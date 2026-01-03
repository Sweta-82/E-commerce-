import React, { useState } from 'react';
import Button from './Button';

const CategorySection = () => {
    const CardsInfo = [
        {
            title: "Women",
            desc: "Discover women's fashion and style.",
            img: "https://i.pinimg.com/736x/e5/e5/26/e5e5261500c0e75e54246de01fb8242e.jpg",
            vid: "https://v1.pinimg.com/videos/mc/720p/c2/eb/bb/c2ebbb42c65b5ad2440f608c52743d0a.mp4"
        },
        {
            title: "Men",
            desc: "Explore men's clothing, accessories, and essentials.",
            img: "https://i.pinimg.com/1200x/d8/41/43/d84143bb4420c7f3ce4c5199329f28fa.jpg",
            vid: "https://v1.pinimg.com/videos/mc/720p/d0/1d/72/d01d720bc89cfd910732c55aff341010.mp4"
        },
        {
            title: "Heels",
            desc: "Step into style with trendy heels for every occasion.",
            img: "https://i.pinimg.com/1200x/a5/93/fd/a593fdda6826321693f54b52157317ed.jpg",
            vid: "https://v1.pinimg.com/videos/mc/720p/47/95/1d/47951d006e1ca89f660841e13bb26f58.mp4"
        },
        {
            title: "Makeup",
            desc: "Enhance your beauty with the latest makeup collections.",
            img: "https://i.pinimg.com/1200x/53/81/29/53812993113f88f759a27269e8616441.jpg",
            vid: "https://v1.pinimg.com/videos/mc/720p/87/43/dd/8743ddaf5f4cf30eefc4333f314a68ec.mp4"
        },
    ];

    const [hover, setHover] = useState(null);

    return (
        <div className=' sm:flex '>
            <div className='sm:w-1/4 h-full flex flex-col justify-center p-10  text-center'>
                <p className='text-4xl font-bold  '>Something New From Fashion</p>
                <p className='font-extralight text-sm text-gray-600 mt-4'>We believe in making clothes that celebrate the people who wear them.</p>
                <Button
                    text="See All"
                    className="hidden sm:block border-black hover:bg-black mt-8 px-5 py-1 text-black hover:text-white"
                />
            </div>


            <div className=' flex gap-4 items-center overflow-x-auto no-scrollbar w-full'>
                {CardsInfo.map((e, idx) => (
                    <div key={idx}
                        onMouseEnter={() => setHover(idx)}
                        onMouseLeave={() => setHover(null)}
                        className='flex flex-col w-[35vw] shrink-0'>
                        <div className='relative w-full h-[20vw]'>
                            {hover === idx ?
                                <video src={e.vid} className='aspect-video  inset-0 w-full h-full object-cover' autoPlay loop muted />
                                :
                                <img
                                    src={e.img}
                                    alt={e.title}
                                    className='object-cover w-full h-full'
                                />
                            }

                            <Button
                                text="Discover"
                                className="bottom-2 left-2 absolute border-black hover:bg-black text-white px-5 py-1 !mt-0"
                            />
                        </div>

                        <p className='font-bold mt-2'>{e.title}</p>
                        <p className='text-gray-600 text-sm'>{e.desc}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default CategorySection;
