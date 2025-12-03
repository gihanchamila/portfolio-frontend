import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CircleLoader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const MIN_DISPLAY_TIME = 300;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, MIN_DISPLAY_TIME);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 dark:bg-neutral-900/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Optimizing your viewing experience...
      </p>
    </motion.div>
  );
};

export default CircleLoader;
