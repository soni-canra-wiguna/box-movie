import React from "react"

export const Banner = ({ title, className }) => {
  return (
    <h1
      className={`${className} text-md mb-0.5 ml-2 font-semibold capitalize text-white sm:mb-2 sm:text-xl md:mb-3 md:text-2xl`}
      data-aos="fade-right"
      data-aos-duration="600"
      data-aos-once="true"
    >
      {title}
    </h1>
  )
}
