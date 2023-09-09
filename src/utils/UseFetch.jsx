import { useState, useEffect } from "react"
import axios from "axios"
import { baseUrl, params, lang } from "./Instance"

// using react
export const useFetch = (endpoint, page) => {
  const [data, setData] = useState([]) //general
  const [stackData, setStackData] = useState([]) // for load more
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchAxios()
  }, [page])

  const fetchAxios = async () => {
    try {
      setIsLoading(true)

      const { data } = await axios.get(
        `${baseUrl}/${endpoint}${lang}&page=${page}`,
        params
      )
      setData(data.results)
      setStackData((prev) => [...prev, ...data.results])

      setIsLoading(false)
    } catch (error) {
      console.log(`something wrong : ${error}`)
    }
  }

  return { data, stackData, isLoading }
}

// using react Query(tanstack query)

// const {data, isLoading, andMore...} = useQuery({
//   queryKey: ["param 1",param2],
//   queryFn: ()=> {}
// })
// untuk info lebih lengkap cari aja documntationnya di tanstackquery.com (kalo gasalah)
