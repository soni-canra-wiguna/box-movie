import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { params } from "../../utils/Instance"
import ReactPlayer from "react-player"
import { cancel } from "../../assets/svg/Index"
import { motion } from "framer-motion"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ThreeDots } from "react-loader-spinner"
import Image from "../UI/Image"
import { bgGradientHover, textGradient } from "../../utils/gradient"
import { useEffect, useRef } from "react"
import { Button } from "../Button"
import { BsFillPlayFill } from "react-icons/bs"
import { VscDebugPause } from "react-icons/vsc"

const SingleVideo = ({ type, id, name, setIsActive }) => {
  const reference = useRef(null)
  useEffect(() => {
    const clickOutside = (e) => {
      if (!reference.current?.contains(e.target)) {
        setIsActive(false)
      }
    }
    document.addEventListener("mousedown", clickOutside)

    return () => {
      document.removeEventListener("mousedown", clickOutside)
    }
  }, [])

  // get video
  const { data: getKeyVideo, isLoading: singleLoadVideo } = useQuery({
    queryKey: ["datavideo", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/${type}/${id}/videos?api_key=${
          import.meta.env.VITE_API_KEY
        }`,
        params
      )

      const trailers = data.results
      const lastIndexTrailer = trailers.length - 1
      const singleIndexTrailer = trailers[lastIndexTrailer]

      if (trailers.length > 0) {
        const trailerKey = singleIndexTrailer.key
        return trailerKey
      } else {
        return null
      }
    },
    cacheTime: 40 * (1000 * 60),
    staleTime: 25 * (1000 * 60),
  })

  const handlePlayerError = () => {
    toast.error("Trailer is not available", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })

    setTimeout(() => {
      setIsActive(false)
    }, 4000)
  }

  const trailerUrl = `https://www.youtube.com/watch?v=${getKeyVideo}`

  if (singleLoadVideo) {
    return (
      <span className="flex items-center justify-center">
        <ThreeDots
          height="30"
          width="30"
          radius="9"
          color="red"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </span>
    )
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        ref={reference}
        className="center__video fixed z-[100] mt-5 aspect-video w-[380px] max-w-5xl flex-col rounded-md border border-gray-400/20 sm:w-[480px] md:w-[768px] lg:w-[65rem]"
      >
        <div className="overflow-hidden rounded-md">
          <div className="flex h-auto w-full items-center justify-between bg-black px-4 py-2.5">
            <h1
              className={`${textGradient} sm:text-md text-sm font-semibold md:text-lg`}
            >
              {name}
            </h1>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsActive(false)}
            >
              <Image
                src={cancel}
                alt="cancel"
                className="hover:fil-red-500 h-6 w-6"
              />
            </motion.button>
          </div>
          <div className="video-wrapper">
            <ReactPlayer
              url={trailerUrl}
              className="react-player"
              playing={true}
              controls
              width="100%"
              height="100%"
              onError={handlePlayerError}
              // onBuffer={handleBuffer}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SingleVideo
