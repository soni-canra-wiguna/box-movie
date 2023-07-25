import React, { useEffect, useRef } from "react"
import HeroSection from "./HeroSection"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { params, requests, type } from "../../utils/Instance"
import {
  SwiperTrailer,
  SwipersLandscape,
  SwipersPortait,
} from "../../components/SwiperThumbnail"

const Home = () => {
  const elemRef = useRef(null)
  const startMovie = (ref) => {
    window.scrollTo({
      top: ref.offsetTop - 180,
      left: 0,
      right: 0,
      behavior: "smooth",
    })
  }

  document.title = "Box Movie"

  const handleButtonHeroSection = () => {
    startMovie(elemRef.current)
  }

  const { data: tvPopular, isLoading: loadTvPopular } = useQuery({
    queryKey: ["trending movie"],
    queryFn: async () => {
      const { data } = await axios.get(requests.tvPopular, params)
      return data.results
    },
    cacheTime: 40 * (1000 * 60),
    staleTime: 25 * (1000 * 60),
  })

  const { data: trendingTv, isLoading: loadTrendingTv } = useQuery({
    queryKey: ["tv trending"],
    queryFn: async () => {
      const { data } = await axios.get(requests.tvTrending, params)
      return data.results
    },
    cacheTime: 40 * (1000 * 60),
    staleTime: 25 * (1000 * 60),
  })

  const { data: movieTopRated, isLoading: loadToprated } = useQuery({
    queryKey: ["movie top rated"],
    queryFn: async () => {
      const { data } = await axios.get(requests.movieTopRated, params)
      return data.results
    },
    cacheTime: 40 * (1000 * 60),
    staleTime: 25 * (1000 * 60),
  })

  const { data: upComing, isLoading: loadUpComing } = useQuery({
    queryKey: ["on the air Tv"],
    queryFn: async () => {
      const { data } = await axios.get(requests.movieUpComing, params)
      return data.results
    },
    cacheTime: 40 * (1000 * 60),
    staleTime: 25 * (1000 * 60),
  })

  return (
    <div>
      <div className="relative h-[90vh] w-full">
        <HeroSection onClick={handleButtonHeroSection} />
      </div>
      <div
        ref={elemRef}
        className="relative flex aspect-video h-[230px] w-full overflow-hidden bg-black/80 px-1 sm:h-[300px] sm:px-2 md:h-[400px] md:px-10 lg:h-[450px] lg:px-20"
      >
        <div className="flex h-full w-full items-center overflow-hidden">
          <SwiperTrailer titleFilm="watch trailer" data={trendingTv} />
        </div>
      </div>

      <div className="mt-[20px] px-1 sm:px-2 md:mt-[40px] md:px-10 lg:px-20">
        <div className="mb-6 flex h-auto w-full flex-col">
          <SwipersLandscape
            titleFilm="Trending"
            data={trendingTv}
            type={type.tv}
          />

          <SwipersPortait titleFilm="popular" data={tvPopular} type={type.tv} />

          <SwipersLandscape
            titleFilm="up coming"
            data={upComing}
            type={type.movie}
          />

          <SwipersPortait
            titleFilm="Top Rated"
            data={movieTopRated}
            type={type.movie}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
