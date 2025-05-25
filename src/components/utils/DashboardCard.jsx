import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

export const DashboardCard = ({
  icon, title, description, onClick, actionLabel, className, animateProps, secondaryActionLabel,
  onSecondaryClick,
}) => (
  <motion.div
    layout
    whileTap={{ scale: 0.97 }}
    animate={animateProps}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    className={`bg-white dark:bg-neutral-800 rounded-2xl shadow-md p-6 flex flex-col items-center justify-between hover:shadow-2xl transition-shadow min-h-auto cursor-pointer ${className}`}
    
  >
    <div className="mb-4 text-sky-500 dark:text-sky-300 xs:text-sm lg:text-base">{icon}</div>
    <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 text-center mb-4 xs:text-sm lg:text-base">{description}</p>
    <div className="flex gap-2 mt-auto">
      {actionLabel && (
        <Button onClick={onClick}
          className="mt-auto px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors text-sm"
        >
          {actionLabel}
        </Button>
      )}
      {secondaryActionLabel && (
        <Button
          onClick={onSecondaryClick}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
        >
          {secondaryActionLabel}
        </Button>
      )}
    </div>
  </motion.div>
);
