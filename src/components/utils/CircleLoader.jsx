import { motion } from 'framer-motion';

const Circle = () => (
  <div className="relative w-5 h-5 mr-4">
    <span className="absolute inset-0 rounded-full border-2 border-sky-200 dark:border-neutral-700"></span>
    <motion.span
      className="absolute inset-0 rounded-full border-2 border-t-sky-500 border-r-transparent border-b-transparent border-l-transparent"
      style={{ borderTopColor: '#0ea5e9' }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
    />
   
  </div>
);

const CircleLoader = () => (
  <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-neutral-900 z-50">
    <Circle />
    <p className="text-sky-500 dark:text-sky-300 text-lg font-medium font-primary">Just a moment</p>
  </div>
);

export default CircleLoader;