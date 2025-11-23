import React from 'react'
import backdrop from '../images/backdrop1.jpg'
function ImageSlider() {
  return (
    <>
      <div className='w-full h-[400px] mt-10'>
        <img 
          src={backdrop}
          alt="" 
          className="w-full h-full bg-center" 
        />
      </div>
    </>
  )
}

export default ImageSlider