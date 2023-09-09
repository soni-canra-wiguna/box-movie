import { motion } from "framer-motion"

const variants = {
  style: {
    outline:
      "border border-yellow-500 text-yellow-500 hover:text-white hover:bg-yellow-500",
    solid: "bg-yellow-500 text-white hover:bg-yellow-600",
  },
  size: {
    small: "px-3 py-2",
    medium: "px-6 py-4",
  },
}

const Buttons = ({ children, variant, size }) => {
  //variant="outline"
  const pickedVariant = variants.style[variant] // variant.style.outline
  const pickedSize = variants.size[size]

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className={`${pickedVariant} z-[9999] inline-block rounded-md ${pickedSize} font-semibold`}
      // onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

export default Buttons

export const Button = ({
  className = "px-3 py-2 border",
  children,
  onClick,
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`${className} rounded-md`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}
