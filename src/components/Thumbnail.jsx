export const ThumbnailLandscape = ({ movie }) => {
  return (
    <section className="group h-full w-full overflow-hidden rounded">
      <div className=" relative aspect-video h-full w-[400px] min-w-full rounded">
        {movie ? (
          <img
            loading="lazy"
            src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
            className="h-full w-full transform rounded-sm object-cover transition duration-500 group-hover:rotate-3 group-hover:scale-110 md:rounded"
            sizes="100%"
            alt={`Thumbnail ${movie?.name}`}
            title={movie.title}
          />
        ) : (
          <div className="h-full w-full animate-pulse rounded-sm bg-zinc-800 md:rounded"></div>
        )}
      </div>
    </section>
  )
}

export const ThumbnailPortait = () => {
  return <div>thumbnail Portait</div>
}

export const ErrorThumbnail = () => {
  return (
    <div className="font-2xl flex items-center justify-center bg-gray-400 px-5 py-3 font-bold text-gray-700">
      <h1>Movie Not Found</h1>
    </div>
  )
}
