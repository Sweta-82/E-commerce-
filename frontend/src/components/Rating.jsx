import React, { useState } from 'react'
import Product from './Product'



function Rating({value,onRatingChange,disable}) {
    const [hoverRating, setHoverRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(value ||0);
    const handleMouseEnter=rating=>{
        if(!disable){
            setHoverRating(rating)
        }
    }
    // mouse leave
        const handleMouseLeave=()=>{
            if(!disable){
            setHoverRating(0)
        }
    }
    // handle click
    const handleClick=(rating)=>{
        if(!disable){
            setSelectedRating(rating);
            if(onRatingChange){
                onRatingChange(rating)
            }
        }
    }
    const generateStars=()=>{
    const stars = [];
    for (let i = 1; i <= 5; i++){
        const isFilled = i <= (hoverRating || selectedRating);
        stars.push(
           <span
          key={i}
          className={`text-xl cursor-pointer ${
            isFilled ? 'text-yellow-400' : 'text-gray-400'
          }`}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
        >
          {isFilled ? '★' : '☆'}
        </span>
        );
    }
    return stars;
}
  return (
    <div>{generateStars()}</div>
  )
}

export default Rating