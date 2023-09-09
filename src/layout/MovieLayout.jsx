import React from "react"

const MovieLayout = ({ children }) => {
  return (
    <main className="mt-20 h-auto w-full px-3 pb-4 sm:mt-[90px] sm:px-4 md:px-10 xl:px-20">
      {children}
    </main>
  )
}

export default MovieLayout
