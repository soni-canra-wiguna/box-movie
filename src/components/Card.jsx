import Image from "./UI/Image"
import { Link } from "react-router-dom"
import { React } from "react"
import { forwardRef } from "react"
import { SwiperSlide } from "swiper/react"
import "swiper/css"

export const CardGrid = forwardRef(({ data, type }, ref) => {
  const { poster_path, id, title, original_title, name, original_name } = data

  const imageContent = (
    <Link key={id} to={`/${type}/${id}`} className="group">
      <div
        className="aspect-[9/14] w-[100px] rounded-md esm:w-[120px] sm:w-[110px] 2xmd:w-[150px] md:w-[160px] lg:w-[150px] xl:w-[170px]"
        ref={ref}
      >
        <Image
          className="h-full w-full rounded-md border border-gray-400/10 object-cover object-center"
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          alt={title || original_title}
          title={title || original_title || name || original_name}
        />
        <h5 className="ease py-2 text-xs font-medium capitalize text-white transition duration-300 group-hover:text-green-500 md:text-sm xl:text-sm">
          {title || original_title || name || original_name}
        </h5>
      </div>
    </Link>
  )
  return imageContent
})

export const CardLandscape = ({
  id,
  backdrop_path,
  original_title,
  title,
  name,
  original_name,
  poster_path,
  type,
}) => {
  return (
    <SwiperSlide
      key={id}
      className="moviecard mx-[4px] flex aspect-video w-[210px] min-w-[210px] items-center justify-center overflow-hidden rounded-md selection:bg-transparent sm:mx-[6px] sm:w-[260px] sm:min-w-[260px] md:mx-[8px] md:w-[320px] md:min-w-[320px] lg:mx-[10px] lg:w-[370px] lg:min-w-[370px]"
    >
      <Link to={`/${type}/${id}`} className="h-full w-full">
        <Image
          src={`https://image.tmdb.org/t/p/w780${backdrop_path || poster_path}`}
          alt={title || original_title}
          title={title || original_title || name || original_name}
          className="h-full w-full object-cover object-center transition duration-500 ease-in-out hover:brightness-[.80]"
        />
      </Link>
    </SwiperSlide>
  )
}
