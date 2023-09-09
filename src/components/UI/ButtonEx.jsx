import React from "react"
import { variant } from "../../utils/Utils"
import { motion } from "framer-motion"

const buttonStyle = variant(
  "shadow-xl w-1/2 hover:shadow-none font-semibold rounded-md transition ease-in duration-400",
  {
    color: {
      primary: "bg-blue-600 hover:bg-blue-700 font-bold text-white",
      secondary: "bg-purple-600 hover:bg-purple-700 font-bold text-white",
      outline:
        "bg-transparent border-black border-2 rounded-full font-semibold text-black hover:bg-black hover:text-white",
    },
    size: {
      small: "py-2 px-3",
      medium: "py-4 px-6",
    },
  }
)

const ButtonEx = ({ color, size, children }) => {
  return (
    <motion.button
      drag
      whileTap={{ scale: 0 }}
      className={buttonStyle({ color, size })}
    >
      {children}
    </motion.button>
  )
}

ButtonEx.defaultProps = {
  color: "primary",
  size: "medium",
}

export default ButtonEx
