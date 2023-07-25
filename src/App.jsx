import React, { Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import NotFound from "./pages/NotFound"
// import MainLayout from "./layout/MainLayout"
const MainLayout = React.lazy(() => import("./layout/MainLayout"))
import PageTv from "./pages/tv/PageTv"
import PageMovie from "./pages/movie/PageMovie"
import DetailPage from "./components/Detail/DetailPage"
import LoadingAnimation from "./components/LoadingAnimation"

const App = () => {
  return (
    <Suspense fallback={<LoadingAnimation />}>
      <MainLayout>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/movie" element={<PageMovie />} />
          <Route path="/tv" element={<PageTv />} />
          <Route path="/:type/:id" element={<DetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Suspense>
  )
}

export default App
