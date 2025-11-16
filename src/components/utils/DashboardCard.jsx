import React from 'react'
import { motion } from 'framer-motion'
import Button from './Button'

export const DashboardCard = ({
  icon,
  title,
  description,
  onClick,
  actionLabel,
  className,
  animateProps,
  secondaryActionLabel,
  onSecondaryClick,
}) => (
  <motion.div
    layout
    whileTap={{ scale: 0.97 }}
    animate={animateProps}
    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    className={`mb-4 flex min-h-auto cursor-pointer flex-col items-center justify-between rounded-2xl bg-white p-4 p-6 shadow-md transition-shadow hover:shadow-2xl dark:bg-neutral-800 ${className}`}
  >
    <div className="xs:text-sm mb-4 text-sky-500 lg:text-base dark:text-sky-300">{icon}</div>
    <h3 className="mb-2 text-center text-lg font-semibold">{title}</h3>
    <p className="xs:text-sm mb-4 text-center text-gray-600 lg:text-base dark:text-gray-300">
      {description}
    </p>
    <div className="mt-auto flex gap-2 pb-2">
      {actionLabel && (
        <Button
          onClick={onClick}
          className="mt-auto rounded bg-sky-500 px-4 py-2 text-sm text-white transition-colors hover:bg-sky-600"
        >
          {actionLabel}
        </Button>
      )}
      {secondaryActionLabel && (
        <Button
          onClick={onSecondaryClick}
          className="rounded bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200"
        >
          {secondaryActionLabel}
        </Button>
      )}
    </div>
  </motion.div>
)
