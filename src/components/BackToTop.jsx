import React from "react"
import { FaArrowUp } from "react-icons/fa"
import { Button } from "./Button"
import { motion } from "framer-motion"
import { useState } from "react"
import { useEffect } from "react"

const BackToTop = () => {
  const [visibleButton, setVisibleButton] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 900) {
      setVisibleButton(!visibleButton)
    } else {
      setVisibleButton(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <motion.div
      className={`  ${
        visibleButton
          ? "block opacity-80 transition duration-500 ease-in md:opacity-100"
          : "hidden opacity-0 transition duration-500 ease-in"
      } group fixed bottom-[1.2rem] left-1/2 z-[59] -translate-x-1/2 transform transition-all duration-500 ease-in-out`}
      style={{ position: "fixed", translateX: "-50%" }}
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleToTop}
        className="flex items-center space-x-1.5 rounded-full border border-black/70 bg-gradient-to-l from-blue-600 to-teal-600 px-2 py-2 text-xs opacity-80 md:text-sm md:opacity-100"
      >
        <FaArrowUp className="fill-black" />{" "}
        <span className="font-medium text-black">back to top</span>
      </motion.button>
    </motion.div>
  )
}

export default BackToTop
