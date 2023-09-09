import Image from "./UI/Image"
import { Link } from "react-router-dom"
import { useFormatDate } from "../utils/formattedDate"
import { forwardRef } from "react"
import { textGradient } from "../utils/gradient"

const SearchResults = forwardRef(({ dataSearch, setSearchMovie }, ref) => {
  return (
    <div
      ref={ref}
      className={`${
        dataSearch.length <= 0 ? "hidden" : "flex"
      } h-full w-full flex-col space-y-2 overflow-y-scroll scrollbar-hide lg:w-5/6`}
    >
      {dataSearch.map((props) => {
        const {
          id,
          title,
          name,
          media_type,
          poster_path,
          overview,
          release_date,
          first_air_date,
          backdrop_path,
          vote_average,
        } = props

        //format time
        const formattedDate = useFormatDate(release_date || first_air_date)

        // ngambil data paling akhir
        const isLastItem = props === dataSearch[dataSearch.length - 1]

        // 35 + ....

        return (
          <Link
            onClick={() => setSearchMovie(false)}
            key={id}
            to={`${media_type}/${id}`}
            className={`group h-full w-full ${
              media_type === "person" ? "hidden" : "block"
            }`}
          >
            <div
              className={`${
                isLastItem ? "mb-7" : "mb-1 sm:mb-1.5 md:mb-2"
              } relative flex h-[160px] w-full items-center justify-between overflow-hidden rounded-md border border-gray-400/20 bg-black/50 transition duration-300 ease-in group-hover:border-blue-600/50 md:h-[200px]`}
            >
              <span
                className={`absolute -right-0 -top-1 z-50 p-2 text-xs md:text-sm ${
                  vote_average?.toFixed(1) <= 6
                    ? "text-red-600"
                    : "text-green-400"
                }`}
              >
                {vote_average?.toFixed(1)}
              </span>
              <div className="group flex h-full w-full space-x-4">
                <Image
                  src={`https://image.tmdb.org/t/p/w300${
                    poster_path || backdrop_path
                  }`}
                  className="h-full w-[140px] object-cover object-center"
                  alt={title || name}
                />
                <div className="flex flex-col space-y-1 py-2 pr-4">
                  <div>
                    <h2
                      className={`sm:text-md text-sm font-bold text-red-600 md:text-lg ${textGradient}`}
                    >
                      {title || name}
                    </h2>

                    <h3 className="pt-1 text-xs text-gray-400 sm:text-sm">
                      {formattedDate}
                    </h3>
                    <p className="hidden w-full pt-2 text-sm text-gray-300 md:block">
                      {overview?.length <= 100
                        ? overview
                        : overview?.substring(0, 130) + "..."}
                    </p>
                    <p className="block w-full pt-2 text-xs text-gray-300 md:hidden">
                      {overview?.length <= 100
                        ? overview
                        : overview?.substring(0, 70) + "..."}
                    </p>
                    <span className="my-3 inline-block rounded-md border border-gray-400/20 px-3 py-1 text-sm text-gray-300/50 transition duration-300 ease-out group-hover:text-blue-600">
                      {media_type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
})

export default SearchResults
