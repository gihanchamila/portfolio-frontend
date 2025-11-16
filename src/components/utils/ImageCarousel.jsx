import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? '110%' : '-110%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? '110%' : '-110%',
    opacity: 0,
  }),
}

const AUTO_SWIPE_INTERVAL = 10000

const ImageCarousel = ({ images }) => {
  if (!images || images.length === 0) return null

  const [[page, direction], setPage] = useState([0, 0])
  const [isHovering, setIsHovering] = useState(false)

  const imageIndex = ((page % images.length) + images.length) % images.length

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection])
  }

  useEffect(() => {
    if (isHovering || images.length <= 1) return
    const intervalId = setInterval(() => paginate(1), AUTO_SWIPE_INTERVAL)
    return () => clearInterval(intervalId)
  }, [page, isHovering, images.length])

  // Threshold and power calculation for the swipe gesture
  const swipeConfidenceThreshold = 10000
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity

  return (
    <div
      className="relative aspect-video w-full cursor-grab overflow-hidden rounded-lg active:cursor-grabbing"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          alt={`Project visual ${imageIndex + 1}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          role="image"
          transition={{
            x: { type: 'spring', stiffness: 500, damping: 50 },
            opacity: { duration: 0.5 },
          }}
          className="absolute h-full w-full object-cover"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={2}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1)
            }
          }}
        />
      </AnimatePresence>
    </div>
  )
}

export default ImageCarousel
