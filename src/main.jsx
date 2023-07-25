import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./Index.css"
import { BrowserRouter as Router } from "react-router-dom"
import AOS from "aos"
import "aos/dist/aos.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import 'react-loading-skeleton/dist/skeleton.css'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      cacheTime: 40 * (1000 * 60),
      staleTime: 30 * (1000 * 60),
    },
  },
})

AOS.init()
AOS.refresh()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
)
