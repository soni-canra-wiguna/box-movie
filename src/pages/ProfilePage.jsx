import { useUser } from "@clerk/clerk-react"
import React, { useState } from "react"
import Image from "./../components/UI/Image"
import { bgGradientHover, textGradient } from "./../utils/gradient"
import { FiLogOut } from "react-icons/fi"
import { useWishlist } from "../context/WatchlistContext"
import WishlistCard from "../components/WishlistCard"
import emptyBox from "../assets/img/empty-box.png"
import { Link } from "react-router-dom"
import { ConfirmLogout } from "./../components/ConfirmLogout"
import useScrollHidden from "../utils/useScrollHidden"

const ProfilePage = () => {
  const { user } = useUser()
  const { wishlist } = useWishlist()
  const { isActive, setIsActive } = useScrollHidden()

  const openModalLoggingOut = () => {
    setIsActive(true)
  }
  function closeModalLoggingOut() {
    setIsActive(false)
  }

  return (
    <main className="mt-[90px] h-auto w-full px-3 pb-4 sm:px-4 md:px-10 lg:px-14 2xl:px-20">
      <div className="min-h-[90vh] w-full">
        <div className="flex flex-col items-center justify-center space-y-2 pt-4">
          <div className="skeleton shadow__profile-img relative aspect-square w-28 overflow-hidden rounded-full md:w-32">
            <Image
              src={user?.imageUrl}
              className="h-full w-full object-cover object-center grayscale"
            />
          </div>
          <h1
            className={`inline-block text-2xl font-semibold md:text-3xl ${textGradient}`}
          >
            {user?.fullName || user?.firstName}
          </h1>
          <button
            onClick={openModalLoggingOut}
            className={`group relative rounded-md border border-gray-400/30 py-2 pl-2 pr-7 ${bgGradientHover}`}
          >
            <span>logout</span>
            <FiLogOut className="absolute right-2 top-3 aspect-square h-4 text-white" />
          </button>
          {isActive && (
            <ConfirmLogout closeModalLoggingOut={closeModalLoggingOut} />
          )}
        </div>
        <div className="mt-16 h-auto w-full">
          <h1 className="inline-block text-xl font-semibold capitalize text-gray-300 underline-offset-2 xl:text-2xl">
            watchlist
          </h1>
          <div>
            <div
              className={`mt-5 ${
                wishlist.length > 0 ? "grid" : "flex"
              } h-full w-full grid-cols-1 gap-4 xl:grid-cols-2`}
            >
              {wishlist.length > 0 ? (
                wishlist.map((item) => (
                  <WishlistCard item={item} key={item.id} />
                ))
              ) : (
                <EmptyWatchlist />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProfilePage

export const EmptyWatchlist = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 pt-14">
      <Image className="aspec-square w-20 opacity-60 sm:w-24" src={emptyBox} />
      <h1 className="px-10 text-center text-lg font-medium text-white/60 md:text-xl xl:text-2xl">
        Your watchlist is empty.{" "}
        <Link to="/" className="text-red-600 hover:underline">
          Add
        </Link>{" "}
        movies to your watchlist
      </h1>
    </div>
  )
}
