import axios from "axios"
import HeroContent from "./HeroContent"
import { useDebounce } from "use-debounce"
import { useQuery } from "@tanstack/react-query"
import React, { useState, useRef } from "react"
import { params, requests, type } from "../../utils/Instance"
import { LoadingLandscape, LoadingPortait } from "../../components/Loading"
import {
  SwiperTrailer,
  SwipersLandscape,
  SwipersPortait,
} from "../../components/SwiperThumbnail"

const Home = () => {
  document.title = "Box Movie"
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("")
  const [debounceImage] = useDebounce(backgroundImageUrl, 500)

  const handleBackgroundImageChange = (imageUrl) => {
    setBackgroundImageUrl(imageUrl)
  }

  const elemRef = useRef(null)
  const startMovie = (ref) => {
    window.scrollTo({
      top: ref.offsetTop - 160,
      left: 0,
      right: 0,
      behavior: "smooth",
    })
  }
  const handleButtonHeroSection = () => {
    startMovie(elemRef.current)
  }

  const { data: popularMoviePage, isLoading: loadPopularMoviePage } = useQuery({
    queryKey: ["popular movie page"],
    queryFn: async () => {
      const { data } = await axios.get(requests.moviePopular, params)
      return data.results
    },
    cacheTime: 40 * (1000 * 60),
    staleTime: 25 * (1000 * 60),
  })

  const { data: tvPopular, isLoading: loadTvPopular } = useQuery({
    queryKey: ["data tv popular"],
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
    queryKey: ["up coming data"],
    queryFn: async () => {
      const { data } = await axios.get(requests.movieUpComing, params)
      return data.results
    },
    cacheTime: 40 * (1000 * 60),
    staleTime: 25 * (1000 * 60),
  })

  return (
    <>
      <div className="relative h-[90vh] w-full">
        <HeroContent onClick={handleButtonHeroSection} />
      </div>
      <div
        ref={elemRef}
        className="relative flex aspect-video h-[230px] w-full overflow-hidden bg-black px-3 transition duration-500 ease-in sm:h-[300px] sm:px-4 md:h-[400px] md:px-10 lg:h-[450px] xl:px-20"
        style={{
          // ubah di bagian sini
          backgroundImage: `url(${debounceImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* skenario => ketika focus ke image di swiper trailer, image background yang di atas berubah */}
        <div className="absolute inset-0 h-full w-full bg-black/80"></div>
        <div className="flex h-full w-full items-center overflow-hidden">
          {loadPopularMoviePage ? (
            <LoadingLandscape className="h-0 w-0" />
          ) : (
            <SwiperTrailer
              titleFilm="watch trailer"
              data={popularMoviePage}
              onImageFocusChange={handleBackgroundImageChange}
            />
          )}
        </div>
      </div>

      <div className="mt-[20px] px-3 sm:px-4 md:mt-[40px] md:px-10 xl:px-20">
        <div className="mb-6 flex h-auto w-full flex-col">
          {loadTrendingTv ? (
            <LoadingLandscape />
          ) : (
            <SwipersLandscape
              titleFilm="Trending"
              data={trendingTv}
              type={type.tv}
            />
          )}

          {loadTvPopular ? (
            <LoadingPortait />
          ) : (
            <SwipersPortait
              titleFilm="popular"
              data={tvPopular}
              type={type.tv}
            />
          )}

          {loadUpComing ? (
            <LoadingLandscape
              variant="w-[60px] md:w-[80px]"
              className="w-[160px] md:w-[170px]"
            />
          ) : (
            <SwipersLandscape
              titleFilm="up coming"
              data={upComing}
              type={type.movie}
            />
          )}

          {loadToprated ? (
            <LoadingPortait
              variant="w-[80px] md:w-[100px]"
              className="w-[150px] md:w-[170px]"
            />
          ) : (
            <SwipersPortait
              titleFilm="Top Rated"
              data={movieTopRated}
              type={type.movie}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Home
