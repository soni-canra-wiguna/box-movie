import React, { useState, useEffect, Suspense } from "react"
import axios from "axios"
import { FaChevronLeft } from "react-icons/fa"

const apiUrl = `${import.meta.env.VITE_BASE_URL}/trending/movie`
const language = "en-US"

const PopularMovie = () => {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [page])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${apiUrl}/week`, {
        params: { language, page },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN_APP}`,
        },
      })
      setMovies((prevMovies) => [...prevMovies, ...response.data.results])

      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const id = Math.random(363 * 3737)

  return (
    <>
      <div className=" relative mx-16 mt-2 flex flex-col">
        <h1 className="fixed text-2xl font-bold">Popular Movies</h1>
        <div className="relative mt-2 flex">
          <div className="fixed mt-8 flex h-[90%] w-72 items-center justify-center rounded-md border border-teal-600 bg-black/20 shadow-sidebar3">
            <div className="mx-5 my-5 flex h-full w-full flex-col items-center justify-between">
              {" "}
              {/* wrapper fixed menu */}
              <div className="group mt-5 flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-teal-800 hover:border-teal-500 hover:bg-teal-600/20">
                <span className="mx-3">search movie popular</span>
                <FaChevronLeft className="mx-3 rotate-180" />
              </div>
            </div>
          </div>

          <div className="relative ml-80 flex-grow">
            {/* {isLoading &&
              Array.from({ length: 10 }).map((_, index) => {
                return (
                  <>
                    <div key={index} className="text-green-600">
                      loading...
                    </div>
                  </>
                )
              })} */}
            <div className="m-0 mb-4 p-0">
              {isLoading ? (
                <button
                  disabled={isLoading}
                  className="ml-4 mt-4 h-10 w-28 rounded-lg border-2 border-black bg-slate-400"
                >
                  loading...
                </button>
              ) : (
                <button
                  onClick={loadMore}
                  className="ml-4 mt-4 h-10 w-28 rounded-lg border-2 border-black bg-blue-400"
                >
                  load more
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PopularMovie
