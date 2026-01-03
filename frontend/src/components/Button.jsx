import React from 'react'
import { FaArrowRight } from "react-icons/fa";

function Button({ text, className, Icon = FaArrowRight, ...props }) {
  return (
    <>
      <button className={` left-2 border border-black hover:bg-black hover:text-white px-5 py-2 group overflow-hidden mt-2 sm:mt-5 ${className}`} {...props}>
        <span className="inline-block transform transition-transform duration-500 group-hover:-translate-x-2 flex items-center justify-center">
          {text}
          <Icon className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </span>
      </button>
    </>
  )
}

export default Button