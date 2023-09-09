import axios from "axios"
import React, { useState } from "react"
import Marquee from "react-fast-marquee"
import { box } from "../../assets/svg/Index"
import { ProgressBar } from "react-loader-spinner"
import { useQuery } from "@tanstack/react-query"
import { Button } from "./../../components/Button"
import { params, requests } from "./../../utils/Instance"
import Image from "../../components/UI/Image"

const HeroContent = ({ onClick }) => {
  const [image, setImage] = useState(false)

  const { data: movieTredingDay, isLoading: loadMovieTrendingDay } = useQuery({
    queryKey: ["movie trending day"],
    queryFn: async () => {
      const { data } = await axios.get(requests.movieTrendingDay, params)
      return data.results
    },
    cacheTime: 40 * (1000 * 60),
    staleTime: 25 * (1000 * 60),
  })

  const { data: movieNowPlaying, isLoading: loadmovieNowPlaying } = useQuery({
    queryKey: ["movie playing"],
    queryFn: async () => {
      const { data } = await axios.get(requests.movieNowPlaying, params)
      return data.results
    },
    cacheTime: 40 * (1000 * 60),
    staleTime: 25 * (1000 * 60),
  })

  const { data: moviePopular, isLoading: loadMoviePopular } = useQuery({
    queryKey: ["movie popular"],
    queryFn: async () => {
      const { data } = await axios.get(requests.moviePopular, params)
      return data.results
    },
    cacheTime: 40 * (1000 * 60),
    staleTime: 25 * (1000 * 60),
  })

  const { data: topRated, isLoading: loadtopRated } = useQuery({
    queryKey: ["top rated"],
    queryFn: async () => {
      const { data } = await axios.get(requests.tvTopRated, params)
      return data.results
    },
    cacheTime: 40 * (1000 * 60),
    staleTime: 25 * (1000 * 60),
  })

  const { data: tvTredning, isLoading: loadTvTrending } = useQuery({
    queryKey: ["tv trending"],
    queryFn: async () => {
      const { data } = await axios.get(requests.tvTrending, params)
      return data.results
    },
    cacheTime: 40 * (1000 * 60),
    staleTime: 25 * (1000 * 60),
  })

  const { data: movieUpComing, isLoading: loadMovieUpComing } = useQuery({
    queryKey: ["movie upcoming"],
    queryFn: async () => {
      const { data } = await axios.get(requests.movieUpComing, params)
      return data.results
    },
    cacheTime: 40 * (1000 * 60),
    staleTime: 25 * (1000 * 60),
  })

  const listSlider = [
    {
      id: 1,
      dataMovie: movieTredingDay,
      className: "h-24 w-[160px]",
      state_image: setImage,
      speed: "50",
    },
    {
      id: 2,
      dataMovie: movieNowPlaying,
      className: "h-20 w-[140px]",
      state_image: setImage,
      speed: "25",
    },
    {
      id: 3,
      dataMovie: tvTredning,
      className: "h-52 w-[400px]",
      state_image: setImage,
      speed: "40",
    },
    {
      id: 4,
      dataMovie: movieUpComing,
      className: "h-32 w-[230px]",
      state_image: setImage,
      speed: "60",
    },

    {
      id: 5,
      dataMovie: topRated,
      className: "h-24 w-[160px]",
      state_image: setImage,
      speed: "15",
    },
    {
      id: 6,
      dataMovie: moviePopular,
      className: "h-28 w-[200px]",
      state_image: setImage,
      speed: "25",
    },
  ]

  return (
    <div className="relative mt-[80px] flex h-full w-full flex-col items-center justify-center overflow-hidden md:flex-row">
      {/* left */}
      <section className="absolute z-20 flex h-full w-full items-center justify-center pb-10 sm:w-[40%] md:relative md:pb-5 lg:w-[40%]">
        <div
          className="flex w-[330px] flex-col px-2 tracking-wide md:w-full md:px-4 lg:px-10 xl:px-16 2xl:px-20"
          data-aos="fade-right"
          data-aos-duration="2000"
        >
          <h1 className="shad w-full whitespace-nowrap text-5xl font-semibold uppercase leading-tight md:text-6xl lg:text-7xl">
            Welcome to
          </h1>
          <h1 className="shad flex items-center text-5xl font-semibold uppercase leading-tight md:text-6xl lg:text-7xl">
            <span className="text-blue-600">b</span>ox{" "}
            <span>
              <hr className="mx-3 h-2 max-h-2 w-10 rounded-full bg-white lg:w-16" />
            </span>{" "}
            <span className="text-teal-600">m</span>ovie
          </h1>

          <p className="shad md:text-md mb-1 w-full text-sm text-gray-300 md:text-gray-400">
            Search, explore, and discover your favorite movies. Try it now, it's
            free and{" "}
            <span className="font-medium text-red-600 line-through">
              ilegal
            </span>{" "}
            legal.
          </p>
          <Button
            onClick={onClick}
            className="shadow__start duration-400 mt-5 hidden h-14 w-80 transform items-center justify-center gap-3 border-2 border-white/80 from-blue-600 to-teal-600 px-8 text-center text-lg font-semibold uppercase text-white/80 transition selection:bg-transparent hover:border-none hover:bg-gradient-to-r hover:text-white md:mt-4 md:flex"
          >
            start your movie
            <span>
              <Image src={box} alt="box" className="w-8" />
            </span>
          </Button>
          <Button
            onClick={onClick}
            className="shadow__start duration-400 mt-5 flex h-14 w-80 transform items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-teal-600 px-8 text-center text-lg font-semibold uppercase text-white transition selection:bg-transparent md:mt-4 md:hidden"
          >
            start your movie
            <span>
              <Image src={box} alt="box" className="w-8" />
            </span>
          </Button>
        </div>
      </section>
      {/* right */}
      <section className="relative h-full flex-1 items-center justify-center overflow-hidden">
        {loadMovieTrendingDay ? (
          <div className="translate-x[-50%] translate-y[-50%] absolute flex transform items-center justify-center gap-2 md:left-[50%] md:top-[37%]">
            <ProgressBar
              height="80"
              width="80"
              ariaLabel="progress-bar-loading"
              wrapperClass="progress-bar-wrapper"
              borderColor="white"
              barColor="white"
            />
            <h1 className="animate-pulse text-lg tracking-wide">
              Loading . . .
            </h1>
          </div>
        ) : (
          <div className="aboslute flex h-auto w-full flex-wrap gap-2 overflow-hidden">
            <div className="grad absolute left-0 z-10 hidden h-full w-full md:block"></div>
            <div className="absolute bottom-0 left-0 z-10 h-[80%] w-full bg-gradient-to-t from-[#101010] md:h-[10%]"></div>

            {listSlider
              ?.slice(0, 15)
              ?.map(({ id, dataMovie, className, state_image, speed }) => (
                <SlideSection
                  key={id}
                  dataMovie={dataMovie}
                  className={className}
                  setImage={state_image}
                  speed={speed}
                />
              ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default HeroContent

export const SlideSection = ({ dataMovie, setImage, className, speed }) => {
  return (
    <section className="h-full w-full items-center">
      <Marquee direction="right" speed={speed}>
        {dataMovie?.map(({ backdrop_path, poster_path, title, id }) => (
          <div className="flex items-center" key={id}>
            <Image
              className={`relative ml-2 aspect-video ${className} min-w-0 gap-2 rounded bg-zinc-900 object-cover`}
              src={`https://image.tmdb.org/t/p/w500${
                setImage ? backdrop_path : poster_path
              }`}
              alt={title}
              title={title}
            />
          </div>
        ))}
      </Marquee>
    </section>
  )
}
