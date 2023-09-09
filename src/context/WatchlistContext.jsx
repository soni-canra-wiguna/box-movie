import React, { createContext, useContext, useEffect } from "react"
import { useReducer } from "react"
import watchlistReducer from "../reducer/watchlistReducer"

// initial state
const initialValue = {
  wishlist: localStorage.getItem("wishlist state")
    ? JSON.parse(localStorage.getItem("wishlist state"))
    : [],
}

// instance context
const WatchlistContext = createContext(initialValue)

// using data context without import useContext and wathlistContext in every component
export const useWishlist = () => {
  return useContext(WatchlistContext)
}

// grab child for share data
const WatchlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(watchlistReducer, initialValue)

  useEffect(() => {
    localStorage.setItem("wishlist state", JSON.stringify(state.wishlist))
  }, [state])

  const addToWatchlist = (movie) => {
    dispatch({ type: "ADD_TO_WATCHLIST", payload: movie })
  }

  const deleteMovieFromWatchlist = (id) => {
    dispatch({ type: "DELETE_MOVIE_FROM_WATCHLIST", payload: id })
  }

  return (
    <WatchlistContext.Provider
      value={{
        wishlist: state.wishlist,
        addToWatchlist,
        deleteMovieFromWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  )
}

export default WatchlistProvider
