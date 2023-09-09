import Image from "./UI/Image"
import { useEffect, useState } from "react"
import { Banner } from "./Banner"
import { Link } from "react-router-dom"
import { FaPlay } from "react-icons/fa"
import SingleVideo from "./Detail/SingleVideo"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper"
import "swiper/css/free-mode"
import "swiper/css"
import { AiOutlineDoubleRight } from "react-icons/ai"
import useScrollHidden from "../utils/useScrollHidden"
import { CardLandscape } from "./Card"
import { type } from "../utils/Instance"

export const SwipersLandscape = ({ titleFilm, data, type }) => {
  return (
    <div className=" flex flex-col py-5 sm:py-6 lg:py-8">
      <Banner title={titleFilm} />
      <div className="">
        <Swiper
          slidesPerView="auto"
          spaceBetween={4}
          freeMode={true}
          modules={[FreeMode]}
          className="mySwiper containermoviecard py-1  md:py-3"
        >
          {data?.map(
            ({
              id,
              backdrop_path,
              original_title,
              title,
              name,
              original_name,
              poster_path,
            }) => (
              <SwiperSlide
                key={id}
                className="moviecard mx-[4px] flex aspect-video w-[210px] min-w-[210px] items-center justify-center overflow-hidden rounded-md selection:bg-transparent sm:mx-[6px] sm:w-[260px] sm:min-w-[260px] md:mx-[8px] md:w-[320px] md:min-w-[320px] lg:mx-[10px] lg:w-[370px] lg:min-w-[370px]"
              >
                <Link to={`/${type}/${id}`} className="h-full w-full">
                  <Image
                    src={`https://image.tmdb.org/t/p/w780${
                      backdrop_path || poster_path
                    }`}
                    alt={title || original_title}
                    title={title || original_title || name || original_name}
                    className="h-full w-full object-cover object-center transition duration-500 ease-in-out hover:brightness-[.80]"
                  />
                </Link>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </div>
  )
}

export const SwipersPortait = ({ titleFilm, data, type }) => {
  return (
    <div className="relative flex flex-col py-2 sm:py-4 md:py-6 lg:py-8">
      <Banner title={titleFilm} />
      <div className="">
        <Swiper
          slidesPerView="auto"
          spaceBetween={4}
          freeMode={true}
          modules={[FreeMode]}
          className="mySwiper containermoviecard py-1  md:py-4"
        >
          {data?.map(
            ({
              id,
              poster_path,
              original_title,
              title,
              name,
              original_name,
            }) => (
              <SwiperSlide
                key={id}
                className="moviecard sm:win-w-[120px] mx-[4px] flex aspect-[9/14] w-[100px] min-w-[100px] items-center justify-center overflow-hidden rounded-md selection:bg-transparent sm:mx-[6px] sm:w-[120px] md:mx-[8px] md:w-[150px] md:min-w-[150px] lg:mx-[10px] lg:w-[170px] lg:min-w-[170px]"
              >
                <Link to={`/${type}/${id}`} className="h-full w-full">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={title || original_title}
                    title={title || original_title || name || original_name}
                    className="h-full w-full object-cover object-center transition duration-500 ease-in-out hover:brightness-[.80]"
                  />{" "}
                </Link>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </div>
  )
}

export const SwiperTrailer = ({ titleFilm, data, onImageFocusChange }) => {
  const [titleOrName, setTitleOrName] = useState("")
  const [activeVideoId, setActiveVideoId] = useState("")

  const { isActive, setIsActive } = useScrollHidden()

  const handleTrailer = (id, data) => {
    setActiveVideoId(id)
    setTitleOrName(data)
    setIsActive(!isActive)
  }

  const handleFocus = (backdrop_path) => {
    onImageFocusChange(`https://image.tmdb.org/t/p/original${backdrop_path}`)
  }

  return (
    <>
      <div className="space-between relative flex w-full flex-col space-y-2">
        <Banner title={titleFilm} />
        <div className="h-full w-full">
          <Swiper
            slidesPerView="auto"
            spaceBetween={4}
            freeMode={true}
            modules={[FreeMode]}
            className="mySwiper containermoviecard swiper-wrapper  py-1 md:py-4"
          >
            {data
              ?.slice(0, 18)
              ?.map(
                ({
                  id,
                  backdrop_path,
                  original_title,
                  title,
                  name,
                  original_name,
                }) => {
                  return (
                    <SwiperSlide
                      onClick={() => handleTrailer(id, { name, title })}
                      onMouseEnter={() => handleFocus(backdrop_path)}
                      key={id}
                      className="moviecard group relative mx-[4px] flex aspect-video w-[220px] min-w-[220px] cursor-pointer items-center justify-center overflow-hidden rounded-md border border-gray-400/10 selection:bg-transparent sm:mx-[6px] sm:w-[280px] sm:min-w-[280px] md:mx-[8px] md:w-[340px] md:min-w-[340px] lg:mx-[10px] lg:w-[450px] lg:min-w-[450px]"
                    >
                      <button
                        type="button"
                        className="group absolute z-10 transition duration-500 ease-in-out group-hover:scale-110"
                      >
                        <FaPlay className="aspect-square h-7 w-7 fill-white sm:h-9 sm:w-9  md:h-16 md:w-16" />
                      </button>
                      <Image
                        src={`https://image.tmdb.org/t/p/w780${backdrop_path}`}
                        alt={title || original_title}
                        title={title || original_title || name || original_name}
                        className="h-full w-full object-cover object-center transition duration-500 ease-in-out hover:brightness-[.75] group-hover:brightness-[.75]"
                      />
                    </SwiperSlide>
                  )
                }
              )}
          </Swiper>
        </div>
      </div>
      {isActive && (
        <>
          <SingleVideo
            type="movie"
            id={activeVideoId}
            name={titleOrName.name || titleOrName.title}
            setIsActive={setIsActive}
          />
        </>
      )}
    </>
  )
}

export const SwiperRecomendation = ({ titleFilm, data, type }) => {
  const [fullRecommendation, setFullRecommendation] = useState(10)

  const isVisibleButton = fullRecommendation < data.length
  const loadMoreButton = (
    <button
      className={`flex items-center justify-end space-x-1 text-xs text-slate-400 ${
        isVisibleButton ? "inline" : "hidden"
      }`}
      onClick={() => setFullRecommendation((prev) => prev + 11)}
    >
      <span className="underline-offset-1 hover:underline">load more</span>{" "}
      <AiOutlineDoubleRight />
    </button>
  )

  return (
    <div className="flex w-full flex-col py-5 sm:py-6 lg:py-8">
      <Banner title={titleFilm} />
      {loadMoreButton}
      <div className="">
        <Swiper
          slidesPerView="auto"
          spaceBetween={4}
          freeMode={true}
          modules={[FreeMode]}
          className="mySwiper containermoviecard py-1  md:py-3"
        >
          {data
            .slice(0, fullRecommendation)
            ?.map(
              ({
                id,
                backdrop_path,
                original_title,
                title,
                name,
                original_name,
                poster_path,
              }) => (
                <SwiperSlide
                  key={id}
                  className="moviecard relative mx-[4px] flex aspect-video w-[210px] min-w-[210px] items-center justify-center overflow-hidden rounded-md selection:bg-transparent sm:mx-[6px] sm:w-[260px] sm:min-w-[260px] md:mx-[8px] md:w-[320px] md:min-w-[320px] lg:mx-[10px] lg:w-[370px] lg:min-w-[370px]"
                >
                  <Link to={`/${type}/${id}`} className="group h-full w-full">
                    <Image
                      src={`https://image.tmdb.org/t/p/w780${
                        backdrop_path || poster_path
                      }`}
                      alt={title || original_title}
                      title={title || original_title || name || original_name}
                      className="h-full w-full object-cover object-center transition duration-500 ease-in-out hover:brightness-[.80]"
                    />
                    <h1 className="absolute bottom-0 w-full translate-y-0 bg-black/70 px-3 py-2 text-center text-xs font-medium transition duration-300 ease-in group-hover:translate-y-0 md:translate-y-20 md:text-sm">
                      {title || original_title || name || original_name}
                    </h1>
                  </Link>
                </SwiperSlide>
              )
            )}
        </Swiper>
      </div>
    </div>
  )
}
