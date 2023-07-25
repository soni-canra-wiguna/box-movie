import React from "react"
import { box } from "../assets/svg/Index"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-2 md:mr-2 lg:mr-5">
      <motion.div whileTap={{ scale: 0.9 }} className="cursor-pointer">
        <Link to="/">
          <img src={box} alt="film" className="w-10" />
        </Link>
      </motion.div>
      <div className="cursor-pointer">
        <motion.h2 whileTap={{ scale: 0.9 }} className="text-3xl font-bold">
          <Link
            to="/"
            className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text font-poppins text-transparent"
          >
            BM
          </Link>{" "}
        </motion.h2>
      </div>
    </div>
  )
}

export default Logo
