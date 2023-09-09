import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import axios from "axios"
import React, { useState, useEffect } from "react"
import { params, type } from "../../utils/Instance"
import { bgGradient } from "../../utils/gradient"
import { useInView } from "react-intersection-observer"
import { LoadingMoviePage } from "../../components/Loading"
import { CardGrid } from "../../components/Card"
import MovieLayout from "../../layout/MovieLayout"
import { FiChevronDown, FiFilter } from "react-icons/fi"

function PageMovie() {
  document.title = "Box Movie | Movie"
  const [selectedGenres, setSelectedGenres] = useState([])
  const [isFilterButton, setIsFilterButton] = useState(false)

  // get genre
  const { data: genres, isLoading: loadingGenreMoviePage } = useQuery({
    queryKey: ["genre movie"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/genre/${type.movie}/list?api_key=${
          import.meta.env.VITE_API_KEY
        }`,
        params
      )

      return data.genres
    },
  })

  //get movie by genre => start
  const { ref, inView } = useInView()
  const genreIds = selectedGenres.join(",")

  const {
    data,
    isLoading,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["projects", genreIds],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/discover/${type.movie}?api_key=${
          import.meta.env.VITE_API_KEY
        }&with_genres=${genreIds}&page=${pageParam}`,
        params
      )
      return res.data
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.page + 1

      return nextPage
    },
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  const content =
    isSuccess &&
    data.pages?.map((page) =>
      page.results?.map((results) => (
        <CardGrid ref={ref} key={results.id} data={results} type="movie" />
      ))
    )
  //get movie by genre => end

  //function click genre
  const handleGenreClick = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId))
      //ok, id nya itu kumpulan element misal isinya [50,44,32]
      //dan genreid -> apa yang ingin kita hapus, misal genreId= 50
      //result -> [44,32]
    } else {
      setSelectedGenres([...selectedGenres, genreId])
    }
  }

  return (
    <MovieLayout>
      <section className="mt-2 flex h-auto flex-col rounded-md  border-gray-400/20">
        {loadingGenreMoviePage ? (
          <span className="skeleton mt-2.5 w-36 rounded-md bg-neutral-600 px-3 py-4"></span>
        ) : (
          <button
            onClick={() => setIsFilterButton(!isFilterButton)}
            className={`${
              isFilterButton
                ? "mb-2 border-teal-400/50 bg-teal-600/30"
                : "hover:border-teal-400/50 hover:bg-teal-600/30"
            } mt-2 flex w-40 items-center justify-between rounded-md border border-gray-400/30 px-3 py-2 `}
          >
            <FiFilter className="aspect-square w-4" />
            <div className="flex items-center">
              <span className=" text-xs capitalize">filter by genres</span>{" "}
              <FiChevronDown className="ml-[2px] aspect-square w-4" />
            </div>
          </button>
        )}

        {isFilterButton && (
          <div className="flex flex-wrap gap-2 text-black transition-opacity">
            {genres?.map((genre) => {
              return (
                <button
                  key={genre.id}
                  onClick={() => handleGenreClick(genre.id)}
                  className={`rounded-md px-3 py-1.5 text-xs hover:border-teal-400/50 hover:bg-teal-600/30 md:text-sm ${
                    selectedGenres.includes(genre.id)
                      ? `${bgGradient} border-none font-medium text-black`
                      : "border border-gray-400/40 bg-transparent text-gray-300"
                  }`}
                >
                  {genre.name}
                </button>
              )
            })}
          </div>
        )}
      </section>

      {/* data */}
      <div className="lg:gird-cols-5 relative mx-auto mt-5 grid h-auto w-full grid-cols-3 gap-3 scrollbar-hide sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {isLoading ? (
          <LoadingMoviePage />
        ) : (
          <>
            {content}
            {isFetchingNextPage && <LoadingMoviePage />}
          </>
        )}
      </div>
    </MovieLayout>
  )
}

export default PageMovie
