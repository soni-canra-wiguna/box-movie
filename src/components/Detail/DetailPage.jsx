import React, { useState, useEffect } from "react"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import SingleVideo from "./SingleVideo"
import { API_KEY, params } from "../../utils/Instance"
import { Button } from "../Button"
import { VscDebugPause } from "react-icons/vsc"
import { Keyword } from "./Keyword"
import { motion } from "framer-motion"
import Recomendation from "./Recomendation"
import { useFormatDate } from "../../utils/formattedDate"
import Image from "../UI/Image"
import { LoadingDetail } from "../Loading"
import useScrollHidden from "../../utils/useScrollHidden"
import { bgGradientHover } from "../../utils/gradient"
import { useWishlist } from "../../context/WatchlistContext"
import {
  BsBookmarkCheckFill,
  BsBookmarkPlusFill,
  BsFillPlayFill,
} from "react-icons/bs"

const DetailPage = () => {
  const { type, id } = useParams()
  const [loadMaxOverview, setLoadMaxOverView] = useState(false)
  const [rateColor, setRateColor] = useState("")
  const [watchlistButton, setWatchlistButton] = useState(() => {
    const localStorageKey = `wishlist_${id}`
    const localWishlist = localStorage.getItem(localStorageKey)
    return localWishlist ? JSON.parse(localWishlist) : false
  })

  const { isActive, setIsActive, handleClick } = useScrollHidden()
  const { addToWatchlist, wishlist } = useWishlist()

  // handle addwatchlist
  const handleAddWishlist = (detail) => {
    setWatchlistButton(!watchlistButton)
    addToWatchlist(detail)

    const localStorageKey = `wishlist_${id}`
    localStorage.setItem(localStorageKey, JSON.stringify(!watchlistButton))
  }

  //fetch data
  const { data: detail, isLoading } = useQuery({
    queryKey: ["detail movie", type, id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}`,
        params
      )
      return data
    },
    cacheTime: 40 * (1000 * 60),
    staleTime: 25 * (1000 * 60),
  })

  // get rating
  useEffect(() => {
    const rating = detail?.vote_average
    if (rating <= 6) {
      setRateColor("red")
    } else {
      setRateColor("green")
    }
  }, [detail?.vote_average])

  //get genre
  const genreNames = detail?.genres?.map((genre) => genre.name)
  const formattedGenres = genreNames?.join(", ")

  //get production companies
  const producttionCompanies = detail?.production_companies?.map(
    (company) => company.name
  )
  const formattedCompanny = producttionCompanies?.join(", ")

  // change format date, 2023-04-04 to 04 april 2023
  const inputDate = detail?.release_date || detail?.first_air_date
  const formattedDate = useFormatDate(inputDate)

  // change runtime?duration to 0h 0min
  function formatTime(minutes) {
    if (minutes == null) {
      return "-"
    }

    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    const hoursStr = String(hours)
    const minutesStr = String(remainingMinutes).padStart(2, "0")

    return (
      <>
        {type === "movie" ? (
          <span>
            {hoursStr}
            <span className="font-thin">h</span> {minutesStr}
            <span className="font-thin">min</span>
          </span>
        ) : (
          <span>
            {minutesStr}
            <span className="font-thin">min</span>/eps
          </span>
        )}
      </>
    )
  }
  const runtime = detail?.runtime || detail?.episode_run_time || null
  const formattedRuntime = formatTime(runtime)

  // loading query
  if (isLoading) {
    return <LoadingDetail />
  }

  return (
    <>
      <div className="relative mt-[70px] flex h-auto w-full flex-col items-center justify-center sm:px-6 md:mt-0 md:h-screen lg:px-24 xl:px-48 2xl:px-60 ">
        <div className="absolute bottom-0 -z-[49] hidden h-[30%] w-full bg-gradient-to-t from-[#111111]/90 sm:h-[35%] md:block md:h-[60%] lg:h-full"></div>
        <div className="absolute inset-0 -z-50 h-full w-full">
          <Image
            className="h-[20%] w-full object-cover object-center brightness-50 selection:bg-transparent sm:h-[25%] md:h-full md:brightness-75"
            src={`https://image.tmdb.org/t/p/original${detail.backdrop_path}`}
            alt={detail.title}
          />
        </div>
        {/* ===========detail start========== */}
        <div className="relative z-40 flex w-full flex-col items-center justify-between overflow-hidden md:mt-8 md:flex-row md:space-x-10 lg:space-x-16">
          <div className="mt-8 flex w-[180px] min-w-[180px] max-w-[180px] flex-col space-y-4 md:mt-1">
            <div className="shadow-card__detail relative h-[280px] w-full overflow-hidden rounded-md border border-gray-400/10 selection:bg-transparent">
              <Image
                src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                alt={detail.title || detail.name}
                title=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div>
              <motion.span whileTap={{ scale: 0.9 }}>
                <Button
                  onClick={handleClick}
                  className={`${bgGradientHover} flex w-full items-center justify-between border border-gray-400 px-4 py-2 capitalize hover:border-black/0`}
                >
                  <span>trailer</span>{" "}
                  {!isActive ? (
                    <BsFillPlayFill className="h-5 w-5 fill-white" />
                  ) : (
                    <VscDebugPause className="h-5 w-5 fill-white" />
                  )}
                </Button>
              </motion.span>
              {isActive && (
                <SingleVideo
                  type={type}
                  id={id}
                  name={detail.title || detail.name}
                  setIsActive={setIsActive}
                />
              )}
            </div>
          </div>
          <div className="flex h-full w-full flex-col space-y-1 px-2 pt-7 md:px-0 md:pt-0">
            <h1 className="text-xl font-bold text-red-600 md:text-3xl">
              {detail.title || detail.name}{" "}
              <span className="text-lg font-medium text-white md:text-2xl">
                (
                {detail.release_date?.substring(0, 4) ||
                  detail.first_air_date?.substring(0, 4) ||
                  "-"}
                )
              </span>
            </h1>
            <h5 className="text-gray-300/90">
              {type === "movie" ? (
                <span>{detail.original_title || detail.title}</span>
              ) : (
                <span>{detail.original_name || detail.name}</span>
              )}
            </h5>
            {/* const [loadMaxOverview, setLoadMaxOverView] = useState(false) */}
            {/* button wishlist in here */}
            <p
              className={`white hidden md:block ${
                detail?.overview.length <= 350 ? "" : "h-[115px]"
              } overflow-y-scroll py-1 text-sm leading-5 text-gray-200 scrollbar-hide md:text-base`}
            >
              {loadMaxOverview
                ? detail.overview
                : detail.overview.slice(0, 350)}{" "}
              <button
                className={`rounded-md border ${
                  detail?.overview.length <= 350 ? "hidden" : "inline-block"
                } border-white/40 bg-black/30 px-2 py-1 text-xs hover:bg-black/40`}
                onClick={() => setLoadMaxOverView(!loadMaxOverview)}
              >
                {loadMaxOverview ? "load less" : "load more..."}
              </button>
            </p>
            <p className="block py-1 text-sm leading-5 text-gray-200/90 md:hidden">
              {detail?.overview}
            </p>
            <section className="flex flex-col py-2 text-sm capitalize tracking-wide">
              <h5 className="text-white/70">
                type : <span className="font-medium text-white">{type}</span>
              </h5>
              <h5 className="text-white/70">
                rating :{" "}
                <span
                  className={`opacitty-100 font-medium ${
                    rateColor === "red" ? "text-red-600" : "text-green-400"
                  }`}
                >
                  {detail.vote_average.toFixed(1)}
                </span>{" "}
                <span className="font-medium text-white">
                  / 10 (
                  <span className="text-white/90">
                    {detail.vote_count} votes
                  </span>
                  )
                </span>
              </h5>

              <h5 className="text-white/70">
                release date :{" "}
                <span className="font-medium text-white">
                  {/* {detail.release_date || detail.first_air_date} */}
                  {formattedDate}
                </span>
              </h5>
              <h5 className="text-white/70">
                status :{" "}
                <span className="font-medium text-white">
                  {detail.status || "-"}
                </span>
              </h5>
              <h5 className="text-white/70">
                duration :{" "}
                <span className="font-medium lowercase text-white">
                  {formattedRuntime}
                </span>
              </h5>
              <h5 className="text-white/70">
                Genre :{" "}
                <span className="font-medium text-white">
                  {formattedGenres || "-"}
                </span>
              </h5>
              <h5 className="text-white/70">
                Studio & companies :{" "}
                <span className="font-medium text-white no-underline">
                  {formattedCompanny || "-"}
                </span>
              </h5>
            </section>
            {/* watchlist button */}
            <section className="flex space-x-2 selection:bg-transparent">
              {watchlistButton ? (
                <button disabled={true}>
                  <BsBookmarkCheckFill
                    title="watchlist was added"
                    className="h-6 w-6 text-green-500"
                  />
                </button>
              ) : (
                <BsBookmarkPlusFill
                  title="add to watch list"
                  onClick={() => {
                    handleAddWishlist(detail)
                  }}
                  className=" h-6 w-6 cursor-pointer text-white"
                />
              )}
              <h1 className="mt-0.5 text-sm capitalize text-gray-200">
                {watchlistButton ? "Added to Watchlist" : "add to watchlist"}
              </h1>
            </section>
          </div>
        </div>
        {/* detail end */}
        <Keyword type={type} id={id} />
      </div>
      {/* recomendation */}
      <Recomendation type={type} id={id} />
    </>
  )
}

export default DetailPage
