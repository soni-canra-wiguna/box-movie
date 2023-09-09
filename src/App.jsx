import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import NotFound from "./pages/NotFound"
import PageTv from "./pages/tv/PageTv"
import PageMovie from "./pages/movie/PageMovie"
import DetailPage from "./components/Detail/DetailPage"
import MainLayout from "./layout/MainLayout"
import {
  SignedOut,
  ClerkProvider,
  SignedIn,
  RedirectToSignIn,
} from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import { Sign, Up } from "./clerk/Auth"
import ProfilePage from "./pages/ProfilePage"
import WatchlistProvider from "./context/WatchlistContext"

const publishKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function App() {
  const navigate = useNavigate()

  return (
    <ClerkProvider publishableKey={publishKey} navigate={(to) => navigate(to)}>
      <MainLayout>
        <WatchlistProvider>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SignedIn>
                    <Home />
                  </SignedIn>
                </>
              }
            />
            <Route path="/sign-in/*" routing="path" element={<Sign />} />
            <Route path="/sign-up/*" routing="path" element={<Up />} />
            <Route path="/movie" element={<PageMovie />} />
            <Route path="/tv" element={<PageTv />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/:type/:id" element={<DetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </WatchlistProvider>
      </MainLayout>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  )
}

export default App
