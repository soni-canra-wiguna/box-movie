import axios from "axios"
import React from "react"
import { useQuery } from "@tanstack/react-query"
import { API_KEY, baseUrl, params } from "../../utils/Instance"

export const Keyword = ({ type, id }) => {
  const { data: getKeyword, isLoadKeyword } = useQuery({
    queryKey: ["keyword detail movie", type, id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${baseUrl}/${type}/${id}/keywords?api_key=${API_KEY}`,
        params
      )
      if (type === "movie") {
        return data.keywords
      } else {
        return data.results
      }
    },
    cacheTime: 40 * (1000 * 60),
    staleTime: 25 * (1000 * 60),
  })

  if (isLoadKeyword) {
    return <Skeleton />
  }

  return (
    <div className="mt-8 flex w-full flex-wrap items-center justify-start px-2 capitalize md:px-0">
      <span className="mb-2 mr-2 text-white/70">keywoard :</span>
      {getKeyword?.length > 0 ? (
        getKeyword?.map((word) => (
          <span
            key={word?.id}
            className="mb-2 mr-2 cursor-default whitespace-nowrap rounded-md border border-gray-200/20 bg-black/30 px-2.5 py-1.5 text-xs text-white/90 hover:bg-black/50 md:text-sm"
          >
            {word?.name || word?.title}
          </span>
        ))
      ) : (
        <span className="mb-1.5">-</span>
      )}
    </div>
  )
}
