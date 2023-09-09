import { useEffect, useState } from "react"

const useScrollHidden = () => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (isActive) {
      //nilai isActive = true
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isActive])

  const handleClick = () => {
    setIsActive(!isActive)
  }

  return { isActive, setIsActive, handleClick }
}

export default useScrollHidden
