import Logo from "./Logo"
import Search from "./Search"
import { motion } from "framer-motion"
import NavbarItems from "./NavbarItems"
import React, { useEffect, useState } from "react"
import { cancel, whiteMenu } from "../assets/svg/Index"
import { useAuth, useUser } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import UserProfile from "./Profile"
import { UserProfileMobile } from "./Profile"
import useScrollHidden from "../utils/useScrollHidden"

const Navbar = () => {
  const [isProfile, setIsProfile] = useState(false)
  const [isProfileMobile, setIsProfileMobile] = useState(false)
  const { isActive, setIsActive } = useScrollHidden()
  const { isActive: searchMovie, setIsActive: setSearchMovie } =
    useScrollHidden() // search
  const navigate = useNavigate()
  const { isSignedIn, user } = useUser()

  // state navbar scroll
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset)
  const [visible, setVisible] = useState(true)

  // useEffect(() => {
  //   if (!isSignedIn) {
  //     return navigate("/")
  //   }
  // }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      if (prevScrollPos > currentScrollPos) {
        setVisible(true)
      } else {
        setVisible(false)
      }
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [prevScrollPos])

  const HandleButtonMobileDevice = () => {
    setIsActive(!isActive)
    setSearchMovie(false)
    setIsProfile(false)
  }

  const handleSearchButton = () => {
    setSearchMovie(!searchMovie)
    setIsActive(false)
    setIsProfile(false)
  }

  return (
    <>
      <header
        className={`navbar fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-center border-b border-gray-400/10 bg-black/70 px-3 py-4 backdrop-blur-xl transition duration-[400ms] ease-in-out sm:px-4 md:px-10 md:py-5 xl:px-20 ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
        }`}
        // true ? muncul : ilang
      >
        <div className="wrapper relative flex w-full items-center justify-between gap-10">
          <div className="menu-left flex items-center  justify-center selection:bg-transparent md:gap-4 lg:gap-10">
            <Logo />
            <nav className="text-md relative hidden md:flex">
              <NavbarItems className="md:space-x-1 lg:space-x-4" />
            </nav>
          </div>
          {/* rigth menu */}
          <div className="menu-right absolute right-8 selection:bg-teal-600/50 md:right-16 xl:right-16">
            <Search
              searchMovie={searchMovie}
              setSearchMovie={setSearchMovie}
              handleSearchButton={handleSearchButton}
            />
          </div>
          {/* profile user */}
          <div className="hidden md:block">
            <UserProfile
              user={user}
              isProfile={isProfile}
              setIsProfile={setIsProfile}
            />
          </div>
          {/* MOBILE DEVICES */}
          <motion.button
            className="md:hidden"
            whileTap={{ scale: 0.9 }}
            onClick={HandleButtonMobileDevice}
          >
            <img
              src={!isActive ? whiteMenu : cancel}
              alt="hamburger menu"
              className="w-6 text-white selection:bg-transparent hover:opacity-90 md:w-7 lg:hidden"
            />
          </motion.button>
        </div>
      </header>
      <aside
        className={`fixed left-0 top-0 z-[51] mt-[70px] flex h-[99%] w-[320px] items-center bg-black/60 backdrop-blur-lg md:hidden ${
          isActive
            ? "block -translate-x-0 transform border-r border-gray-400/20 transition duration-500 ease-in-out"
            : "-translate-x-[320px] transition duration-500 ease-in-out"
        }`}
      >
        <div className="relative flex h-full w-full flex-col px-5 sm:px-7">
          <NavbarItems
            className="mt-5 flex-col"
            HandleButtonMobileDevice={HandleButtonMobileDevice}
          />
          {/* place user information? */}
          <div className="block md:hidden">
            <UserProfileMobile
              user={user}
              setIsActive={setIsActive}
              isProfileMobile={isProfileMobile}
              setIsProfileMobile={setIsProfileMobile}
            />
          </div>
        </div>
      </aside>
    </>
  )
}

export default Navbar
