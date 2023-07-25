import React from "react"
import { FaSearch } from "react-icons/fa"
import { motion } from "framer-motion"

const Input = ({
  onChange,
  className = "relative",
  variant = "bg-black/80",
}) => {
  return (
    <div className={`flex ${className} items-center justify-center`}>
      <div className="group relative flex h-full w-full items-center justify-center">
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="absolute left-4 z-50 inline-flex h-5/6 w-8 items-center"
        >
          <FaSearch className="w-4 fill-gray-400 transition-all duration-200 ease-in hover:fill-teal-600" />
        </motion.button>
        <input
          type="text"
          className={`${variant} flex h-12 w-full items-center justify-center rounded-md border-2 border-white/70 py-2 pl-11 pr-4 text-white outline-none selection:bg-teal-600/50 focus:border-teal-600 group-focus:border-2 md:focus:backdrop-blur-lg `}
          placeholder="search movie, tv..."
          spellCheck="false"
        />
      </div>
    </div>
  )
}

export default Input
