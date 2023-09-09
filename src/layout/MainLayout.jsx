import React from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import BackToTop from "../components/BackToTop"

const MainLayout = ({ children }) => {
  return (
    <div className="relative flex h-screen w-full flex-col antialiased">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default MainLayout
