import React from "react"
import { useNavigate } from "react-router-dom"
import { FidgetSpinner } from "react-loader-spinner"
import { Button } from "../components/Button"
import { FiArrowUpRight } from "react-icons/fi"

const NotFound = () => {
  const navigate = useNavigate()

  const home = () => {
    navigate("/")
  }
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center gap-4 text-center">
      <h1 className="flex items-center justify-center gap-3 text-8xl font-bold uppercase">
        4
        <span>
          <FidgetSpinner
            visible={true}
            height="85"
            width="85"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
            ballColors={["#0d968b", "#0d968b", "#0d968b"]}
            backgroundColor="#ffffff"
          />
        </span>
        4
      </h1>
      <h1 className="text-5xl font-bold uppercase"> page not found </h1>
      <div className="mx-auto ">
        <Button
          onClick={home}
          className="mt-5 flex h-12 w-40 items-center justify-center gap-2 rounded-md border border-slate-400/30 from-blue-600 to-teal-600 ease-in-out hover:border-black hover:bg-gradient-to-r hover:text-black"
        >
          Back to Home <FiArrowUpRight />
        </Button>
      </div>
    </div>
  )
}

export default NotFound
