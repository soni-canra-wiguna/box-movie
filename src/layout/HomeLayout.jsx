import React from "react"

const HomeLayout = ({ children }) => {
  return (
    <div className="h-auto w-full px-3 sm:px-4 md:px-10">
      <div className="h-full w-full">{children}</div>
    </div>
  )
}

export default HomeLayout
