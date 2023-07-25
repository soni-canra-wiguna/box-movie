import React, { useState, useEffect } from "react"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import SingleVideo from "./SingleVideo"
import { API_KEY, params } from "../../utils/Instance"
import { Button } from "../Button"
import { BsFillPlayFill } from "react-icons/bs"
import { VscDebugPause } from "react-icons/vsc"
import { Keyword } from "./Keyword"
import { motion } from "framer-motion"
import Recomendation from "./Recomendation"

const DetailPage = () => {
  const { type, id } = useParams()
  const [isActive, setIsActive] = useState(false)
  const [rateColor, setRateColor] = useState("")

  const handleClick = () => {
    setIsActive(!isActive)
  }

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

  console.log(detail)

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
  function formatDate(inputDate) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    if (!inputDate) {
      return "Tanggal tidak tersedia"
    }

    const dateParts = inputDate.split("-")
    const day = dateParts[2]
    const month = months[Number(dateParts[1]) - 1]
    const year = dateParts[0]

    return `${day} ${month} ${year}`
  }
  const inputDate = detail?.release_date || detail?.first_air_date
  const formattedDate = formatDate(inputDate)

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
  const runtime = detail?.runtime || detail?.episode_run_time
  const formattedRuntime = formatTime(runtime)

  // loading query
  if (isLoading) {
    return <div>loading....</div>
  }

  return (
    <>
      <div className="relative mt-[70px] flex h-screen w-full flex-col items-center justify-center px-10 md:mt-0 md:px-20 lg:px-60">
        <div className="absolute bottom-0 -z-[49] hidden h-full w-full bg-gradient-to-t from-[#111111]/90 md:block"></div>
        <div className="absolute inset-0 -z-50 h-full w-full">
          <img
            className=" h-[20%] w-full object-cover object-center brightness-50 selection:bg-transparent sm:h-[40%] md:h-[60%] md:brightness-75 lg:h-full"
            src={`https://image.tmdb.org/t/p/original${detail.backdrop_path}`}
            alt={detail.title}
            loading="lazy"
          />
        </div>
        {/* ===========detail start========== */}
        <div className="relative z-40 mt-8 flex w-full flex-row justify-between space-x-16">
          <div className="mt-1 flex w-[180px] min-w-[180px] max-w-[180px] flex-col space-y-4">
            <div className="h-[280px] w-full overflow-hidden rounded-md selection:bg-transparent">
              <img
                src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                alt={detail.title || detail.name}
                title={detail.title || detail.name}
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div>
              <motion.span whileTap={{ scale: 0.9 }}>
                <Button
                  onClick={handleClick}
                  className="flex w-full items-center justify-between border border-gray-400 from-blue-600 to-teal-600 px-4 py-2 capitalize hover:border-black/0 hover:bg-gradient-to-r"
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
                  detail={detail}
                  setIsActive={setIsActive}
                />
              )}
            </div>
          </div>
          <div className="flex w-full flex-col space-y-1">
            <h1 className="text-3xl font-bold text-red-600">
              {detail.title || detail.name}{" "}
              <span className="text-2xl font-medium text-white">
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
            <p className="white text-base leading-5 text-gray-200">
              {detail.overview}
            </p>
            <section className="flex flex-col pt-3 text-sm capitalize tracking-wide">
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
                <span className="font-medium text-white">
                  {formattedCompanny || "-"}
                </span>
              </h5>
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
