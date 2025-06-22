// CircleLoader.jsx
import { motion } from 'framer-motion';

export const Circle = () => (
  <motion.div
    className="w-5 h-5 border-2 border-t-transparent border-sky-500 dark:border-sky-300 rounded-full mr-3"
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
  />
)

const CircleLoader = () => (
  <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-neutral-900 z-50 ">
    <Circle />
    <p className="text-sky-500 dark:text-sky-300 text-lg font-medium font-primary ">Just a moment</p>
  </div>
);

export default CircleLoader;
