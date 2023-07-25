import React, { useState, useEffect } from "react"
import { useFetch } from "../../utils/UseFetch"
import { Oval } from "react-loader-spinner"

const PopularTv = () => {
  const [page, setPage] = useState(1)
  const [options, setOptions] = useState({
    params: { language: "en-US", page },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN_APP}`,
    },
  })

  const { data, isLoading } = useFetch(
    `${import.meta.env.VITE_BASE_URL}/trending/movie/day`,
    options
  )

  useEffect(() => {
    setOptions({
      params: { language: "en-US", page },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN_APP}`,
      },
    })
  }, [page])

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const nextPage = () => {
    setPage(page + 1)
  }

  return (
    <>
      <div className="mt-10 flex gap-5">
        <button
          onClick={prevPage}
          className="rounded-lg border-2 border-black px-4 py-2"
          disabled={page === 1}
        >
          prev
        </button>
        <button
          onClick={nextPage}
          className="rounded-lg border-2 border-black px-4 py-2"
        >
          next
        </button>
      </div>
      {isLoading ? (
        <div className="absolute right-40 top-20">
          <Oval />
        </div>
      ) : (
        ""
      )}
      <div>
        <ul className="mx-3 flex flex-col flex-nowrap gap-10">
          {data.map(({ title, release_date }, index) => (
            <div key={index}>
              <li>{title}</li>
              <h2>{release_date}</h2>
            </div>
          ))}
        </ul>
      </div>
    </>
  )
}

export default PopularTv
