import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MousePointer2 } from 'lucide-react'

const cursorVariants = {
  hidden: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
}

const CustomCursor = ({ show, text }) => {
  const cursorRef = useRef(null)

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }
    if (show) {
      document.addEventListener('mousemove', moveCursor)
    }
    return () => document.removeEventListener('mousemove', moveCursor)
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={cursorRef}
          className="pointer-events-none fixed z-50"
          style={{ transform: 'translate(-50%, -50%)' }}
          variants={cursorVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="rounded-xl border border-black bg-white px-6 py-2 text-lg font-bold text-black select-none dark:border-none dark:bg-black/80 dark:text-white">
            {text}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CustomCursor
