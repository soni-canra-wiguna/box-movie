const watchlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WATCHLIST":
      // Cek apakah produk sudah ada di wishlist
      if (state.wishlist.some((movie) => movie.id === action.payload.id)) {
        return state // Jika sudah ada, tidak perlu menambahkannya lagi
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      }
    case "DELETE_MOVIE_FROM_WATCHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter((movie) => movie.id !== action.payload),
      }
    default:
      return state
  }
}
export default watchlistReducer
