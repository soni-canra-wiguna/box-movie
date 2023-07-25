// mission = buat sebuah proses fetching data dari tmdb, dengan tombol prev dan next page, data harus flexsible saat click tombol

import React, { useState, useEffect } from "react"
import axios from "axios"

const apiUrl = "https://api.themoviedb.org/3/trending/movie"
const language = "en-US"
const token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGQ3ZDQ4YTdjMDg0MDllZmQ4ZGEyM2M1NTU1MzQzZCIsInN1YiI6IjY0MDIwOGM5Mjc4ZDhhMDA3YTEzM2Y4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qk811ISCeLniJMOgvnqTZc5piK4yFXTsThU3kRAS4o8"

const TrendingTv = () => {
  const [dataTv, setDataTv] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    useFetchTv()
  }, [page])

  const useFetchTv = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/week`, {
        params: { language, page },
        headers: {
          accept: "application/json",
          authorization: token,
        },
      })

      setDataTv(data.results)
    } catch (error) {
      console.log(error)
    }
  }

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
      <ul>
        {dataTv.map?.((tv, index) => (
          <li key={`${tv.id}_${index}`}>{tv.title}</li>
        ))}
      </ul>
      <div>
        <div>
          <button onClick={prevPage} disabled={page <= 1}>
            prev page
          </button>
        </div>
        <div>
          <button onClick={nextPage}>next page</button>
        </div>
      </div>
    </>
  )
}

export default TrendingTv
