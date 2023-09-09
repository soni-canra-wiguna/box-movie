import axios from "axios"
import { motion } from "framer-motion"
import { CgClose } from "react-icons/cg"
import { FaSearch } from "react-icons/fa"
import { useDebounce } from "use-debounce"
import { useQuery } from "@tanstack/react-query"
import React, { useEffect, useRef, useState } from "react"
import { cancel, search } from "../assets/svg/Index"
import { API_KEY, baseUrl, params } from "../utils/Instance"
import SearchResults from "./SearchResults"
import { LoadingSearch } from "./Loading"
import Image from "./UI/Image"

const Search = ({ searchMovie, setSearchMovie, handleSearchButton }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [value] = useDebounce(searchQuery, 1000)
  const inputRef = useRef(null)

  const reference = useRef(null)
  useEffect(() => {
    const clickOutside = (e) => {
      if (!reference.current?.contains(e.target)) {
        setSearchMovie(false)
      }
    }
    document.addEventListener("mousedown", clickOutside)

    return () => {
      document.removeEventListener("mousedown", clickOutside)
    }
  }, [])

  const { data: dataSearch, isLoading } = useQuery({
    queryKey: ["search feature", value],
    queryFn: async () => {
      const { data } = await axios.get(
        `${baseUrl}/search/multi?query=${value}&api_key=${API_KEY}`,
        params
      )
      return data.results
    },
    cacheTime: 40 * (1000 * 60),
    staleTime: 25 * (1000 * 60),
  })

  //focus to input when click search button
  useEffect(() => {
    if (searchMovie && inputRef.current) {
      inputRef.current.focus()
    } else {
      if (inputRef.current) {
        inputRef.current.blur()
      }
    }
  }, [searchMovie])

  const handleChange = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="flex"
        onClick={handleSearchButton}
      >
        <Image
          src={searchMovie === true ? cancel : search}
          alt="search"
          className="h-6 w-6 md:h-7 md:w-7"
        />
      </motion.button>
      {searchMovie && (
        <div className="fixed inset-0 z-[60] flex h-screen w-full justify-center overflow-hidden bg-black/80">
          <div className="flex h-full w-full max-w-sm flex-col items-center px-2 pt-20 sm:max-w-[30rem] md:max-w-[36rem] lg:max-w-3xl">
            {/* input start */}
            <div
              ref={reference}
              className={`relative flex h-20 w-full items-center justify-center lg:w-5/6`}
            >
              <div className="group relative flex h-full w-full items-center justify-center">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="absolute left-2 z-50 inline-flex h-8 w-8 items-center px-2 py-2"
                >
                  <FaSearch className="w-4 fill-gray-400 transition-all duration-200 ease-in hover:fill-teal-600" />
                </motion.button>
                <input
                  type="text"
                  ref={inputRef}
                  onChange={handleChange}
                  className={`flex h-12 w-full items-center justify-center rounded-md border-2 border-white/70 bg-black/40 py-2 pl-11 pr-11 text-white outline-none selection:bg-teal-600/50 focus:border-teal-600 group-focus:border-2`}
                  placeholder="search movie, tv..."
                  spellCheck="false"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSearchMovie(false)}
                  className="absolute right-3 z-50 inline-flex h-8 w-8 items-center px-2 py-2"
                >
                  <CgClose className="w-4 text-red-600 transition-all duration-200 ease-in hover:fill-teal-600" />
                </motion.button>
              </div>
            </div>
            {/* input end */}

            {isLoading ? (
              <LoadingSearch />
            ) : dataSearch?.length > 0 ? (
              <SearchResults
                ref={reference}
                dataSearch={dataSearch}
                setSearchMovie={setSearchMovie}
              />
            ) : (
              <p className="hidden text-teal-600">movie not found</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Search
