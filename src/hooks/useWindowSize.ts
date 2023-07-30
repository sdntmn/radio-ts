import { useEffect, useState } from "react"

interface WindowSize {
  windowWidth: number
  windowHeight: number
}

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    windowWidth: 0,
    windowHeight: 0,
  })

  const handleSize = (): void => {
    setWindowSize({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    })
  }

  useEffect(() => {
    if (
      windowSize.windowWidth !== window.innerWidth ||
      windowSize.windowHeight !== window.innerHeight
    ) {
      handleSize()
    }
    window.addEventListener("resize", handleSize)
    return () => {
      window.removeEventListener("DOMContentLoaded", handleSize)
    }
  }, [window.innerWidth, window.innerHeight])

  return windowSize
}
