import { motion } from "framer-motion"
import { NavLink } from "react-router-dom"

const NavbarItems = ({ className = "", HandleButtonMobileDevice }) => {
  const list = [
    {
      path: "/",
      path_name: "Home",
    },
    {
      path: "/movie",
      path_name: "Movie",
    },
    {
      path: "/tv",
      path_name: "Tv Series",
    },
  ]
  return (
    <ul className={`${className} flex w-full justify-between`}>
      {list?.map(({ path_name, path }) => (
        <motion.li
          whileTap={{ scale: 0.95 }}
          className="m-0 cursor-pointer rounded-lg px-3 py-2 font-semibold"
          key={path || path_name}
        >
          <NavLink
            to={path}
            className="text-sm hover:text-teal-600 md:text-base"
            onClick={HandleButtonMobileDevice}
          >
            {path_name}
          </NavLink>
        </motion.li>
      ))}
    </ul>
  )
}

export default NavbarItems
