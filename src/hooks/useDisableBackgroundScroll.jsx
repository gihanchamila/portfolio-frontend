import { useEffect } from 'react'

const useDisableBackgroundScroll = (isPopupOpen) => {
  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isPopupOpen])
}

export default useDisableBackgroundScroll
