import React from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const MainLayout = ({ children }) => {
  return (
    <div className="relative flex h-screen w-full flex-col antialiased">
      <Navbar className="" />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
