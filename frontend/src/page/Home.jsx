import React, { useRef, useState } from 'react'
import { FaArrowRight } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import Button from '../components/Button';
import { CiDeliveryTruck } from "react-icons/ci";
import { Ri24HoursFill } from "react-icons/ri";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
function Hero() {
  const CardsInfo = [
  {
    title: "Women",
    desc: "Discover women's fashion and style.",
    img: "https://i.pinimg.com/736x/e5/e5/26/e5e5261500c0e75e54246de01fb8242e.jpg",
    vid:"https://v1.pinimg.com/videos/mc/720p/c2/eb/bb/c2ebbb42c65b5ad2440f608c52743d0a.mp4"
  },
  {
    title: "Men",
    desc: "Explore men's clothing, accessories, and essentials.",
    img: "https://i.pinimg.com/1200x/d8/41/43/d84143bb4420c7f3ce4c5199329f28fa.jpg",
    vid:"https://v1.pinimg.com/videos/mc/720p/d0/1d/72/d01d720bc89cfd910732c55aff341010.mp4"
  },
  {
    title: "Heels",
    desc: "Step into style with trendy heels for every occasion.",
    img: "https://i.pinimg.com/1200x/a5/93/fd/a593fdda6826321693f54b52157317ed.jpg",
    vid:"https://v1.pinimg.com/videos/mc/720p/47/95/1d/47951d006e1ca89f660841e13bb26f58.mp4"
  },
  {
    title: "Makeup",
    desc: "Enhance your beauty with the latest makeup collections.",
    img: "https://i.pinimg.com/1200x/53/81/29/53812993113f88f759a27269e8616441.jpg",
    vid:"https://v1.pinimg.com/videos/mc/720p/87/43/dd/8743ddaf5f4cf30eefc4333f314a68ec.mp4"
  },
];

const ProductsData = [
  {
    _id: 1,
    title: "Double the Warmth Girl's Fashion Jacket",
    price: "$249.00",
    sizes: ["S", "M"],
    ratings: 4.5,
    img: "https://i.pinimg.com/1200x/3e/24/b7/3e24b7db916793d5959ca7be0d31bc52.jpg",
    back:'https://i.pinimg.com/1200x/4f/97/66/4f97660788138baf9437286409b79deb.jpg',
    thumbnails: [
      "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg",
      "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg",
      "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg",
      "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg"
    ],
  },
  // {
  //   id: 2,
  //   title: "Men's Urban Streetwear Hoodie",
  //   price: "$199.00",
  //   oldPrice: "$249.00",
  //   discount: "20% off",
  //   sizes: ["M", "L"],
  //   img: "https://i.pinimg.com/1200x/1d/c8/12/1dc8127a8a679f1d9a4a958e627a854a.jpg",
  //   thumbnails: [
  //     "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg",
  //     "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg",
  //     "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg",
  //     "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg"
  //   ],
  // },
  // {
  //   id: 3,
  //   title: "Stylish Women's Heels",
  //   price: "$99.00",
  //   oldPrice: "$149.00",
  //   discount: "34% off",
  //   sizes: ["6", "7", "8"],
  //   img: "https://i.pinimg.com/736x/13/6c/57/136c570cacc0ef212e958f210a7fd208.jpg",
  //   thumbnails: [
  //     "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg",
  //     "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg",
  //     "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg",
  //     "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg"
  //   ],
  // },
  // {
  //   id: 4,
  //   title: "Professional Makeup Kit Combo",
  //   price: "$299.00",
  //   oldPrice: "$349.00",
  //   discount: "14% off",
  //   sizes: ["NA"],
  //   img: "https://i.pinimg.com/1200x/b8/7c/56/b87c56298eb14154fdac15e65ad24dea.jpg",
  //   thumbnails: [
  //     "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg",
  //     "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg",
  //     "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg",
  //     "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg"
  //   ],
  // },
  // {
  //   id: 5,
  //   title: "Trendy Men's Sneakers",
  //   price: "$179.00",
  //   oldPrice: "$219.00",
  //   discount: "18% off",
  //   sizes: ["7", "8", "9"],
  //   img: "https://i.pinimg.com/736x/ef/62/2c/ef622cc489f83b6eefba054434b426be.jpg",
  //   thumbnails: [
  //     "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg",
  //     "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg",
  //     "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg",
  //     "https://i.pinimg.com/736x/97/0f/64/970f64c39c4e4ceb7fc0e7e73363c7bf.jpg"
  //   ],
  // }
];

const scrollRef = useRef(null)
const scrollLeft=()=>{
  console.log(scrollRef);
  
}

 const [hover, setHover] = useState(null);
 const [back, setBack] = useState(null);
  return (
    <>
    <PageTitle title='Home'/>
    <Navbar/>
    <div className='bg-black w-full h-screen relative'>
        <img src="https://i.pinimg.com/1200x/3a/e2/c6/3ae2c625afd99ca272a439cf73cb17fe.jpg" alt="" 
        className='w-full h-screen object-cover '
        />
        
        <div className='  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-100 w-screen p-10 text-center sm:text-start'>
        <h1 className='  text-[8vw] font-bold tracking-tighter sm:leading-[12vw] whitespace-normal leading-[8vw]'>Spring summer collection</h1>
        <h1 className=' text-2xl pt-10 '>Finest Wrinkle Free Collection</h1>
        <h1 className='pt-2 leading-3 text-sm tracking-tight'>Oversize fit collared shirt. Long sleeves with buttoned cuffs. Chest patch pocket.</h1>
        <button className="uppercase bg-white text-black mt-8 px-10 py-3 hover:bg-gray-200 group relative overflow-hidden">
        <span className="inline-block transform transition-transform duration-500 group-hover:-translate-x-2">
          Shop Now
        <FaArrowRight className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </span>
        </button>
        </div>

    </div>
    <div className=' sm:flex '>
      <div className='sm:w-1/4 h-full flex flex-col justify-center p-10  text-center'>
      <p className='text-4xl font-bold  '>Something New From Fashion</p>
      <p className='font-extralight text-sm text-gray-600 mt-4'>We believe in making clothes that celebrate the people who wear them.</p>
      <button className="hidden sm:block border border-black hover:bg-black text-white mt-8 px-5 py-1 group relative overflow-hidden">
        <span className="inline-block transform transition-transform duration-500 group-hover:-translate-x-2 text-black font-bold hover:text-white">
          See All
        <FaArrowRight className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </span>
        </button>
      </div>

      
    <div className=' flex gap-4 items-center overflow-x-auto no-scrollbar w-full'>
    {CardsInfo.map((e, idx) => (
      <div key={idx}
      onMouseEnter={() => setHover(idx)}
      onMouseLeave={() => setHover(null)}
      className='flex flex-col w-[35vw] shrink-0'>
        <div className='relative w-full h-[20vw]'>
          {hover === idx?
          <video src={e.vid} className='aspect-video  inset-0 w-full h-full object-cover' autoPlay loop muted />
          :
          <img
            src={e.img}
            alt={e.title}
            className='object-cover w-full h-full'
          />
          }
          
          <button className="bottom-2 left-2 absolute border border-black hover:bg-black text-white px-5 py-1 group overflow-hidden">
            <span className="inline-block transform transition-transform duration-500 group-hover:-translate-x-2">
              Discover
              <FaArrowRight className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </span>
          </button>
        </div>

        <p className='font-bold mt-2'>{e.title}</p>
        <p className='text-gray-600 text-sm'>{e.desc}</p>
      </div>
    ))}
  </div>

    </div>


    {/* collection featues */}
    <div className=' w-full p-10 bg-re'>
      <h1 className='text-center p-5 font-extrabold text-[3vw]'>Featured Collection</h1>
      <div className='relative mb-5 bg-amber-300'>
      <div className=' hidden sm:flex  justify-between w-full absolute top-[30%] -translate-y-1/2 px-4 z-10 text-white text-3xl'>
        <IoIosArrowBack ref={scrollLeft} className='bg-[#121212] cursor-pointer p-1 ' />
        <IoIosArrowForward className='bg-[#121212] cursor-pointer p-1 ' />
      </div>
      {/* <div className=' h-[40vw] mb-5 flex gap-4 overflow-x-auto no-scrollbar relative bg-green-600'> */}
        {ProductsData.map((product,idx) =>(
        <Link to={`${product._id}`}>
        <div key={idx} className=' lg:-h-[25vw] w-[28vw] bg-blue-400'
        onMouseEnter={() => setBack(idx)}
         onMouseLeave={() => setBack(null)}>
        <div className=' w-[28vw] h-[30vw] shrink-0 relative hover:scale-105 transition-transform duration-300 ease-in-out overflow-hidden group'>
          <p className=' absolute bg-black font-bold text-white p-1  ml-1 mt-1 text-sm'>0</p>
          <FaEye className='absolute bottom-0 text-white bg-[#121212] p-1 text-2xl group' />
          {back===idx?
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
          {product.sizes.map((size, idx)=>(
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
      
    <div className=' w-full flex relative h-[30vw] '>
      <div className=' w-[60%] '>
        <img src="https://i.pinimg.com/736x/2d/54/b0/2d54b08629727a6d93cc3ae7abd9572c.jpg" alt=""
        className='w-full h-full object-cover '
        />
      </div>
      <div className='bg-white w-[50%] h-[70%]  right-0 top-1/2 transform -translate-y-1/2 absolute text-center p-5 border border-gray-400'>
      <p className='uppercase text-2xl font-bold mb-5'>Big sale</p>
      <p className=' text-xl'>The best collection of the week</p>
      <p className=' text-gray-900 mt-3'>The offer has been expired!</p>
      {/* <Button text= "Discover"  /> */}
      <button className="bottom-2 border border-black hover:bg-black  px-12 py-3 group overflow-hidden mt-5 ">
                <span className="inline-block text-black transform transition-transform duration-500 group-hover:-translate-x-2 group-hover:text-white">
                  Shop The Collection
                  <FaArrowRight className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </span>
     </button>
      </div>
    </div> 
    

    <div className=' mt-10 flex sm:h-[20vw]  h-[30vw]'>
      <div className='bg-gray-100 text-center sm:p-10 pt-2 sm:leading-0 leading-4 bg-red-600 p-4'>
      <p className='uppercase sm:text-2xl font-bold sm:mb-5 text-xl'>Exclusive Service</p>
      <p className=' text-gray-900 sm:mt-3 text-sm '>All the online shopping services available during the holiday season</p>
      {/* <Button text= "Discover"  /> */}
      <Button text="Shop The Collection"  />
      </div>
      <div className='w-full h-full'>
        <video src='https://v1.pinimg.com/videos/mc/720p/c2/eb/bb/c2ebbb42c65b5ad2440f608c52743d0a.mp4' className='aspect-video  inset-0 w-full h-full object-cover' autoPlay loop muted />
      </div>
    </div>
    {/* <div className='bg-red-200 h-screen w-full flex'>
      <div className='bg-green-400 w-1/3 h-full'></div>
      <div className='bg-green-600 w-1/3 h-full'></div>
      <div className='bg-green-900 w-1/3 h-full'></div>
    </div> */}

    {/* ours services */}
    <div className=' h-[16vw] mt-5 flex justify-between items-center pl-5 pr-5 sm:pl-30 sm:pr-30 sm:justify-around'>
      <div className=' items-center text-center flex flex-col'>
      <CiDeliveryTruck className='text-2xl sm:text-4xl font-extralight text-[#121212]'/>
        <p className='font-bold text-[#121212]'>Free shipping</p>
        <p className=' text-sm leading-4 text-gray-500'>Free shpping world wide</p>
      </div>
      <div className=' items-center text-center flex flex-col'>
      <Ri24HoursFill className='text-2xl sm:text-4xl font-extralight text-[#121212]' />
        <p className='font-bold text-[#121212]'>24X7 service</p>
        <p className=' text-sm leading-4 text-gray-500'>Online service for new customer</p>
      </div>
      <div className=' items-center text-center flex flex-col'>
      <HiOutlineSpeakerphone className='text-2xl sm:text-4xl font-extralight text-[#121212]' />
        <p className='font-bold text-[#121212]'>Festival offer</p>
        <p className=' text-sm leading-4 text-gray-500'>New online special festival offer</p>
      </div>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default Hero