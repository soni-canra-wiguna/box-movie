import React from "react"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import {
  SwipersLandscape,
  SwipersPortait,
} from "../../components/SwiperThumbnail"
import { params, requests, type } from "../../utils/Instance"

const PageTv = () => {
  document.title = "Box Movie | Tv Series"

  const { data: moviePopular, isLoading: loadMoviePopular } = useQuery({
    queryKey: ["movie popular"],
    queryFn: async () => {
      const { data } = await axios.get(requests.moviePopular, params)
      return data.results
    },
  })
  const { data: trendingTv, isLoading: loadTrendingTv } = useQuery({
    queryKey: ["tv trending"],
    queryFn: async () => {
      const { data } = await axios.get(requests.tvTrending, params)
      return data.results
    },
  })

  return (
    <div className="mt-[80px] px-1 sm:px-2 md:px-10 lg:px-20">
      <div className="mb-10 flex h-auto w-full flex-col space-y-6">
        <SwipersLandscape
          titleFilm="trending tv"
          data={moviePopular}
          type={type.movie}
        />
        <SwipersLandscape
          titleFilm="trending tv"
          data={trendingTv}
          type={type.tv}
        />
      </div>
      <SwipersPortait titleFilm="Popular Tv" data={trendingTv} type={type.tv} />
    </div>
  )
}

export default PageTv
