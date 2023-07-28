import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { API_KEY, params } from "../../utils/Instance"
import ReactPlayer from "react-player"
import { cancel } from "../../assets/svg/Index"
import { motion } from "framer-motion"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ThreeDots } from "react-loader-spinner"

const SingleVideo = ({ type, id, detail, setIsActive }) => {
  const { data: getKeyVideo, isLoading: singleLoadVideo } = useQuery({
    queryKey: ["datavideo", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}`,
        params
      )

      const trailers = data.results
      const lastIndexTrailer = trailers.length - 1
      const singleIndexTrailer = trailers[lastIndexTrailer]

      if (trailers.length > 0) {
        const trailerKey = singleIndexTrailer.key
        return trailerKey
      } else {
        return console.log("key is not define!!")
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
  }

  const handleBuffer = () => {
    alert("video sedang di muat")
  }

  const trailerUrl = `https://www.youtube.com/watch?v=${getKeyVideo}`

  if (singleLoadVideo) {
    return (
      <div className="flex items-center justify-center">
        <ThreeDots
          height="30"
          width="30"
          radius="9"
          color="blue"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    )
  }
  return (
    <>
      <div className="fixxx fixed z-[50] aspect-video w-[380px] max-w-5xl flex-col sm:w-[480px] md:w-[768px] lg:w-[65rem]">
        <div className="overflow-hidden rounded-md">
          <div className="flex h-auto w-full items-center justify-between bg-black px-4 py-2.5">
            <h1 className="sm:text-md bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-sm font-semibold text-transparent md:text-lg">
              {detail.title || detail.name}
            </h1>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsActive(false)}
            >
              <img
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
              onBuffer={handleBuffer}
              fallback={<h1>video ilang kwwkwk</h1>}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default SingleVideo
