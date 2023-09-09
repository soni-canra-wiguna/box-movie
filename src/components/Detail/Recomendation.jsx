import axios from "axios"
import React from "react"
import { useQuery } from "@tanstack/react-query"
import { SwiperRecomendation } from "../SwiperThumbnail"
import { API_KEY, baseUrl, params } from "../../utils/Instance"
import { ThreeDots } from "react-loader-spinner"
import { LoadingLandscape } from "../Loading"

const Recomendation = ({ type, id }) => {
  const { data: getRecomend, isLoading } = useQuery({
    queryKey: ["recomendation", type, id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${baseUrl}/${type}/${id}/recommendations?api_key=${API_KEY}`,
        params
      )
      return data.results
    },
    cacheTime: 40 * (1000 * 60),
    staleTime: 25 * (1000 * 60),
  })

  return (
    <div className="relative flex aspect-video h-[240px] w-full max-w-full overflow-hidden px-1 sm:h-[260px] sm:px-4 md:h-[300px] md:px-10 lg:h-[400px] lg:px-20">
      <div className="flex h-full w-full items-center overflow-hidden">
        {isLoading ? (
          <LoadingLandscape />
        ) : (
          <SwiperRecomendation
            data={getRecomend}
            type={type}
            titleFilm="Recommendations"
            loading={isLoading}
          />
        )}
      </div>
    </div>
  )
}

export default Recomendation
