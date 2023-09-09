import { FidgetSpinner } from "react-loader-spinner"

export const LoadingAnimation = () => {
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
        loading ...
      </h1>
    </div>
  )
}

export const LoadingLandscape = ({
  variant = "md:w-[160px] w-[130px]",
  className,
}) => {
  const listLoadingLandscape = []
  for (let i = 0; i <= 4; i++) {
    listLoadingLandscape.push({
      id: i,
      style:
        "aspect-video min-w-[210px] sm:min-w-[260px] md:min-w-[320px] w-full lg:min-w-[370px] animate-pulse rounded-md border border-gray-400/10 bg-neutral-800",
    })
  }
  return (
    <div className="flex w-full flex-col space-y-4 py-10 md:space-y-7">
      <div className="flex space-x-2">
        <span
          className={`h-7 md:h-9 ${variant} skeleton rounded-md bg-neutral-800`}
        ></span>
        <span
          className={`${className} skeleton animate-pulse rounded-md bg-neutral-800`}
        ></span>
      </div>
      <div className="flex h-auto w-full min-w-full flex-nowrap space-x-2 overflow-hidden md:space-x-4">
        {listLoadingLandscape?.map(({ id, style }) => (
          <div key={id} className={`${style} skeleton`}></div>
        ))}
      </div>
    </div>
  )
}

export const LoadingPortait = ({ variant = "w-[100px]", className }) => {
  const listLoadingPortait = []
  for (let i = 0; i <= 10; i++) {
    listLoadingPortait.push({
      id: i,
      style:
        "sm:win-w-[120px] w-full aspect-[9/14] min-w-[100px] md:min-w-[150px] lg:min-w-[170px] xmd:min-w-[130px] animate-pulse rounded-md border border-gray-400/10 bg-neutral-800",
    })
  }
  return (
    <div className="flex w-full flex-col space-y-4 py-10 md:space-y-7">
      <div className="flex space-x-2">
        <span
          className={`h-7 md:h-9 ${variant} skeleton animate-pulse rounded-md bg-neutral-800`}
        ></span>
        <span
          className={`${className} skeleton animate-pulse rounded-md bg-neutral-800`}
        ></span>
      </div>
      <div className="flex h-auto w-full min-w-full flex-nowrap space-x-2 overflow-hidden md:space-x-4">
        {listLoadingPortait?.map(({ id, style }) => (
          <div key={id} className={`${style} skeleton`}></div>
        ))}
      </div>
    </div>
  )
}

export const LoadingSearch = () => {
  return (
    <div className="flex h-auto w-full flex-col space-y-2">
      <div className="flex h-auto w-full flex-col items-center space-y-3">
        <div className="skeleton flex h-[160px] w-full items-center justify-center space-x-4 rounded-md border border-gray-400/20 bg-[#050505] sm:h-[180px] md:h-[200px] lg:w-5/6">
          <div className="flex h-full w-full items-center space-x-3 overflow-hidden p-2.5">
            <div className="h-full w-[110px] rounded-md bg-neutral-700 sm:w-[125px] md:w-[140px]"></div>
            <div className=" flex h-full w-full flex-col space-y-3">
              <div className="h-3 w-[170px] rounded-full bg-neutral-700 md:h-5"></div>
              <div className="h-2 w-[70px] rounded-full bg-neutral-700"></div>
              <div className="w-full flex-col space-y-2 pb-2">
                <div className="h-2 w-full rounded-full bg-neutral-700 md:h-3"></div>
                <div className="h-2 w-full rounded-full bg-neutral-700 md:h-3"></div>
              </div>
              <div className="h-4 w-[60px] rounded-full bg-neutral-700 md:h-6"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-auto w-full flex-col items-center space-y-3">
        <div className="skeleton flex h-[160px] w-full items-center justify-center space-x-4 rounded-md border border-gray-400/20 bg-[#050505] sm:h-[180px] md:h-[200px] lg:w-5/6">
          <div className="flex h-full w-full items-center space-x-3 overflow-hidden p-2.5">
            <div className="h-full w-[110px] rounded-md bg-neutral-700 sm:w-[125px] md:w-[140px]"></div>
            <div className=" flex h-full w-full flex-col space-y-3">
              <div className="h-3 w-[170px] rounded-full bg-neutral-700 md:h-5"></div>
              <div className="h-2 w-[70px] rounded-full bg-neutral-700"></div>
              <div className="w-full flex-col space-y-2 pb-2">
                <div className="h-2 w-full rounded-full bg-neutral-700 md:h-3"></div>
                <div className="h-2 w-full rounded-full bg-neutral-700 md:h-3"></div>
              </div>
              <div className="h-4 w-[60px] rounded-full bg-neutral-700 md:h-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const LoadingDetail = () => {
  return (
    <>
      <div className="relative mt-[70px] flex h-auto w-full flex-col items-center justify-center px-2 md:h-screen md:px-20 lg:mt-0 lg:px-60">
        {/* ===========detail start========== */}
        <div className="relative z-40 mt-8 flex w-full flex-col items-center justify-between space-x-4 space-y-3 overflow-hidden md:flex-row md:space-x-12">
          {/* image with video */}
          <div className="mt-1 flex w-[180px] min-w-[180px] max-w-[180px] flex-col space-y-4">
            <div className="h-[280px] w-full overflow-hidden rounded-md selection:bg-transparent">
              <div className="skeleton h-full w-full bg-neutral-600"></div>
            </div>
            <span className="skeleton rounded-md bg-neutral-600 px-6 py-5"></span>
          </div>
          {/* text detail */}
          <div className="flex h-full w-full flex-col space-y-2 pt-3 md:pt-0">
            <div className="skeleton h-6 w-[200px] rounded-full bg-neutral-600"></div>
            <div className="skeleton mt-2 h-3 w-[80px] rounded-full bg-neutral-600"></div>
            <p className="flex flex-col space-y-2 pt-3">
              <span className="skeleton h-3 w-4/6 rounded-full bg-neutral-600"></span>
              <span className="skeleton h-3 w-4/6 rounded-full bg-neutral-600"></span>
              <span className="skeleton h-3 w-4/6 rounded-full bg-neutral-600"></span>
            </p>
            <section className="flex flex-col space-y-3 pt-6 text-sm capitalize tracking-wide">
              {/* type */}
              <div className="skeleton h-2 w-[60px] rounded-full bg-neutral-600"></div>

              {/* rating */}
              <div className="skeleton h-2 w-[100px] rounded-full bg-neutral-600"></div>

              {/* release date */}
              <div className="skeleton h-2 w-[120px] rounded-full bg-neutral-600"></div>

              {/* status */}
              <div className="skeleton h-2 w-[110px] rounded-full bg-neutral-600"></div>

              {/* duration */}
              <div className="skeleton h-2 w-[100px] rounded-full bg-neutral-600"></div>

              {/* genre */}
              <div className="skeleton h-2 w-[190px] rounded-full bg-neutral-600"></div>

              {/* studio */}
              <div className="skeleton h-2 w-[300px] rounded-full bg-neutral-600"></div>

              {/* watchlist */}
              <div className="skeleton h-4 w-[50px] rounded-full bg-neutral-600"></div>
            </section>
          </div>
        </div>
        {/* keywoard */}
        <div className="flex w-full flex-wrap items-center justify-start pl-2 pt-8 capitalize md:pl-0 md:pt-12">
          <span className="skeleton mb-2 mr-2 whitespace-nowrap rounded-md bg-neutral-600 px-10 py-4"></span>
          <span className="skeleton mb-2 mr-2 whitespace-nowrap rounded-md bg-neutral-600 px-8 py-4"></span>
          <span className="skeleton mb-2 mr-2 whitespace-nowrap rounded-md bg-neutral-600 px-12 py-4"></span>
          <span className="skeleton mb-2 mr-2 whitespace-nowrap rounded-md bg-neutral-600 px-16 py-4"></span>
          <span className="skeleton mb-2 mr-2 whitespace-nowrap rounded-md bg-neutral-600 px-10 py-4"></span>
          <span className="skeleton mb-2 mr-2 whitespace-nowrap rounded-md bg-neutral-600 px-14 py-4"></span>
        </div>
      </div>
    </>
  )
}

export const LoadingMoviePage = () => {
  const listLoading = []

  for (let i = 1; i <= 10; i++) {
    listLoading.push({
      id: i,
      skeletonImg:
        "h-full w-full rounded-md bg-neutral-600 object-cover object-center skeleton",
      skeletonText: "w-full py-2 h-4 bg-neutral-600 mt-2 rounded-md skeleton",
    })
  }
  return (
    <>
      {listLoading?.map(({ id, skeletonImg, skeletonText }) => (
        <div
          key={id}
          className="aspect-[9/14] w-[100px] rounded-md esm:w-[120px] sm:w-[110px] 2xmd:w-[150px] md:w-[160px] lg:w-[150px] xl:w-[170px]"
        >
          <div className={skeletonImg}></div>
          <h5 className={skeletonText}></h5>
        </div>
      ))}
    </>
  )
}
