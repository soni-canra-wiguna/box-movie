import React, { useState } from "react"
import { motion } from "framer-motion"
import { Link, NavLink } from "react-router-dom"
import { cancel, search, whiteMenu, box } from "../assets/svg/Index"
import { Button } from "./Button"
import Input from "./Input"
import Logo from "./Logo"

const Navbar = () => {
  const [searchMovie, setSearchMovie] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const handleActive = () => {
    setIsActive(!isActive)
  }
  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-center border-b border-gray-400/10 bg-black/70 px-2 py-4 backdrop-blur-xl md:py-5">
        <div className="wrapper mx-4 flex w-full items-center justify-between gap-10 md:mx-6 lg:mx-10">
          <div className="menu-left flex items-center  justify-center selection:bg-transparent md:gap-4 lg:gap-10">
            <Logo />
            {/* navigation */}
            <nav className="text-md relative hidden md:flex">
              <ListNavigation className="md:space-x-1 lg:space-x-4" />
            </nav>
          </div>
          {/* rigth menu */}
          <div className="menu-right hidden selection:bg-teal-600/50 md:flex">
            <div className="relative flex items-center text-black md:gap-4 lg:gap-8">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="flex"
                onClick={() => setSearchMovie(!searchMovie)}
              >
                <img
                  src={searchMovie === true ? cancel : search}
                  alt="search"
                  className="h-7 w-7"
                />
              </motion.button>

              <div className="flex gap-3">
                <LoginWithSignIn />
              </div>
              {searchMovie && (
                <Input className="absolute right-60 w-96 md:right-52 lg:right-56" />
              )}
            </div>
          </div>
          {/* MOBILE DEVICES */}
          <motion.button
            className="md:hidden"
            whileTap={{ scale: 0.9 }}
            onClick={handleActive}
          >
            <div>
              <img
                src={!isActive ? whiteMenu : cancel}
                alt="hamburger menu"
                className="w-6 text-white selection:bg-transparent hover:opacity-90 md:w-7 lg:hidden"
              />
            </div>
          </motion.button>
        </div>
      </header>
      <aside
        className={`fixed left-0 top-0 z-[51] mt-[70px] flex h-[99%] w-[360px] items-center bg-black/60 backdrop-blur-lg sm:w-[400px] md:hidden ${
          isActive
            ? "block -translate-x-0 transform border-r border-gray-400/30 transition duration-500 ease-in-out"
            : "-translate-x-[400px] transition duration-500 ease-in-out"
        }`}
      >
        <div className="relative flex h-full w-full flex-col px-5 sm:px-7">
          <ListNavigation
            className="flex-row py-2"
            handleActive={handleActive}
          />
          <hr className="w-full border-t border-gray-300/30 py-3" />
          <Input variant="bg-black/20" />
          {/* hasil input */}
          <div className="mt-4 h-[350px] w-full overflow-y-auto rounded-md border border-gray-400/30 scrollbar-hide">
            <div className="h-full w-full px-2">
              <p className="text-3xl font-semibold leading-relaxed tracking-wider">
                <span className="text-red-500">
                  ini untuk nampilin hasil search di mobile device
                </span>{" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti natus, ex facere quis vitae blanditiis error molestiae
                dolores nemo id, esse consequuntur. Neque ipsa quisquam
                asperiores cupiditate reprehenderit accusantium sequi?
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-col space-y-2">
            <LoginWithSignIn />
          </div>
        </div>
      </aside>
    </>
  )
}

export default Navbar

export const ListNavigation = ({ className = "", handleActive }) => {
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
    <ul
      className={`${className} container mx-auto flex w-full justify-between space-x-4`}
    >
      {list?.map(({ path_name, path }) => (
        <motion.li
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer rounded-lg px-3 py-2 font-semibold"
          key={path || path_name}
        >
          <NavLink
            to={path}
            className=" hover:text-teal-600"
            onClick={handleActive}
          >
            {path_name}
          </NavLink>
        </motion.li>
      ))}
    </ul>
  )
}

export const LoginWithSignIn = () => {
  return (
    <>
      <Button className="whitespace-nowrap border-2 border-teal-600 px-3 py-2 text-sm text-white shadow-textBtn/80 hover:bg-teal-600/20 hover:shadow-md">
        Sign Up
      </Button>
      <Button className="duration-50 whitespace-nowrap bg-gradient-to-r from-blue-600 to-teal-600 px-3 py-2 text-black shadow-textBtn/80 ease-out hover:opacity-80 hover:shadow-md">
        Login
      </Button>
    </>
  )
}
