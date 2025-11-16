import { motion } from 'framer-motion'

const Circle = () => (
  <div className="relative mr-4 h-5 w-5">
    <span className="absolute inset-0 rounded-full border-2 border-sky-200 dark:border-neutral-700"></span>
    <motion.span
      className="absolute inset-0 rounded-full border-2 border-t-sky-500 border-r-transparent border-b-transparent border-l-transparent"
      style={{ borderTopColor: '#0ea5e9' }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, ease: 'linear', duration: 1 }}
    />
  </div>
)

const CircleLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-neutral-900">
    <Circle />
    <p className="font-primary text-lg font-medium text-sky-500 dark:text-sky-300">Just a moment</p>
  </div>
)

export default CircleLoader
