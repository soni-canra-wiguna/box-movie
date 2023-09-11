import React, { useEffect } from "react"
import { SignOutButton } from "@clerk/clerk-react"
import { FiLogOut } from "react-icons/fi"
import { motion } from "framer-motion"
import { textGradient } from "../utils/gradient"
import { Link } from "react-router-dom"

const UserProfile = ({ user, isProfile, setIsProfile }) => {
  //when we scroll, the modal profile will be dissapear
  useEffect(() => {
    function handleScroll() {
      setIsProfile(false)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="relative hidden aspect-square h-11 w-11 items-center justify-center md:block">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsProfile(!isProfile)}
        className="relative"
      >
        <div className="h-full w-full">
          <img
            src={user?.imageUrl}
            className="h-full w-full rounded-full object-cover object-center"
            alt={user?.fullName}
          />
        </div>
        {/* modal userProfile */}
      </motion.button>
      {isProfile && (
        <div
          onScroll={() => setIsProfile(false)}
          className="absolute right-2 top-12 flex h-auto w-[250px] flex-col space-y-1.5 rounded-md border border-gray-400/30 bg-black p-2"
        >
          <Link
            onClick={() => setIsProfile(false)}
            to="/profile"
            className="duration-400 w-full rounded-sm px-3 py-2 text-center transition ease-in hover:bg-gray-400/30"
          >
            <span
              className={`${textGradient} overflow-hidden text-center font-semibold capitalize`}
            >
              {user?.fullName || "someOne"}{" "}
              <span className="text-yellow-400">✨</span>
            </span>
          </Link>
          <div className="relative w-full">
            <SignOutButton
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsProfile(false)}
              className=" duration-400 w-full rounded-sm px-3 py-2 pr-8 transition ease-in hover:bg-gray-400/30"
            >
              log out
            </SignOutButton>
            <FiLogOut className="absolute right-[75px] top-3 aspect-square h-4 text-white" />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile

// profile mobile
export const UserProfileMobile = ({
  user,
  isProfileMobile,
  setIsProfileMobile,
  setIsActive,
}) => {
  return (
    <div className="fixed bottom-40 left-4 aspect-square w-10">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsProfileMobile(!isProfileMobile)}
        className="relative h-full w-full"
      >
        <img
          src={user?.imageUrl}
          className="h-full w-full rounded-full border border-gray-400/70"
          alt={user?.fullName}
        />
        {/* modal userProfile */}
      </motion.button>
      {isProfileMobile && (
        <div
          onScroll={() => setIsProfileMobile(false)}
          className="absolute left-12 top-0 flex h-auto w-[240px] flex-col space-y-1.5 rounded-md border border-gray-400/30 bg-black p-2"
        >
          <Link
            className="duration-400 w-full rounded-sm px-3 py-2 text-center transition ease-in hover:bg-gray-400/30"
            onClick={() => {
              setIsProfileMobile(false)
              setIsActive(false)
            }}
            to="/profile"
          >
            <span
              className={`${textGradient} relative w-full overflow-hidden rounded-sm text-center font-semibold capitalize`}
            >
              {user?.fullName || "someOne"}{" "}
              <span className="text-yellow-400">✨</span>
            </span>
          </Link>
          <div className="relative w-full">
            <SignOutButton
              onClick={() => setIsProfileMobile(false)}
              className=" duration-400 w-full rounded-sm px-3 py-2 pr-8 transition ease-in hover:bg-gray-400/30"
            >
              log out
            </SignOutButton>
            <FiLogOut className="absolute right-[64px] top-3 aspect-square h-4 text-white" />
          </div>
        </div>
      )}
    </div>
  )
}
