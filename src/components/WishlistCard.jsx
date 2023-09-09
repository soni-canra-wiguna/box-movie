import React from "react"
import { useWishlist } from "../context/WatchlistContext"
import Image from "./UI/Image"
import { useFormatDate } from "../utils/formattedDate"
import { MdDeleteOutline } from "react-icons/md"
import { textGradient } from "../utils/gradient"

const WishlistCard = ({ item }) => {
  const { deleteMovieFromWatchlist } = useWishlist()

  function deleteMovieAndId(id) {
    deleteMovieFromWatchlist(id)
    localStorage.removeItem(`wishlist_${id}`)
  }

  // change format date, 2023-04-04 to 04 april 2023
  const inputDate = item?.release_date || item?.first_air_date
  const formattedDate = useFormatDate(inputDate)

  return (
    <div
      className="flex h-[210px] space-x-3 overflow-hidden rounded-md border border-gray-400/20 bg-black text-black md:h-[250px]"
      key={item.id}
    >
      <div className="aspect-[9/14] w-[120px] selection:bg-transparent sm:w-[130px] md:w-[150px] lg:w-[160px]">
        <Image
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex flex-1 flex-col py-3 pr-3">
        <h1 className={`text-sm font-bold md:text-lg ${textGradient}`}>
          {item.title || item.name}
        </h1>
        <h5 className="text-xs text-white/60 md:text-sm">{formattedDate}</h5>
        <p className="pt-1 text-xs text-gray-400/90 md:hidden md:pt-3 md:text-sm">
          {item.overview.length > 140
            ? item.overview.substring(0, 150) + "..."
            : item.overview}
        </p>
        <p className="hidden pt-3 text-xs text-gray-400/90 md:inline md:text-sm">
          {item.overview.length > 250
            ? item.overview.substring(0, 250) + "..."
            : item.overview}
        </p>
        <button
          onClick={() => deleteMovieAndId(item.id)}
          title="remove from watchlist"
          className="mt-4 flex w-24 items-center justify-center space-x-1 rounded-md border border-gray-400/40 bg-black p-1.5 text-white text-white/80 hover:border-red-500/70 hover:bg-red-500/30"
        >
          <MdDeleteOutline className="h-5 w-5 " />{" "}
          <span className="text-sm capitalize">remove</span>
        </button>
      </div>
    </div>
  )
}

export default WishlistCard
