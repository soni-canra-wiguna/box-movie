import React from "react"
import { box } from "../assets/svg/Index"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { textGradient } from "../utils/gradient"

const Logo = () => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="flex items-center justify-center gap-2 md:mr-2 lg:mr-8"
    >
      <div whileTap={{ scale: 0.9 }} className="cursor-pointer">
        <Link to="/">
          <img src={box} alt="film" className="w-10" />
        </Link>
      </div>
      <div className="cursor-pointer">
        <h2 whileTap={{ scale: 0.9 }} className="text-3xl font-bold">
          <Link to="/" className={`${textGradient}`}>
            BM
          </Link>{" "}
        </h2>
      </div>
    </motion.div>
  )
}

export default Logo
