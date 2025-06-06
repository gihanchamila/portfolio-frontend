// components/AnimatedSuspenseWrapper.jsx
import React, { Suspense } from 'react';
import { motion } from 'framer-motion';

const defaultFallback = (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3 }}
    className="flex justify-center items-center h-full p-6 text-xl text-gray-600 "
  >
    Loading...
  </motion.div>
);

const AnimatedSuspenseWrapper = ({ children, fallback = defaultFallback }) => {
  return (
    <Suspense fallback={fallback}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </Suspense>
  );
};

export default AnimatedSuspenseWrapper;
