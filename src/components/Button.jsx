import { motion } from "framer-motion"

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
