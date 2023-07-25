import React from "react"
import { FidgetSpinner, ProgressBar } from "react-loader-spinner"

const LoadingAnimation = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center gap-4 text-center">
      <h1 className="flex items-center justify-center gap-3 text-5xl font-semibold uppercase">
        L
        <span>
          <FidgetSpinner
            visible={true}
            height="45"
            width="45"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
            ballColors={["#0d968b", "#0d968b", "#0d968b"]}
            backgroundColor="#ffffff"
          />
        </span>
        ading ...
      </h1>
    </div>
  )
}

export default LoadingAnimation
