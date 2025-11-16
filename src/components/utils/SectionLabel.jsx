import React from 'react'

const SectionLabel = ({ icon, label, className = '' }) => {
  return (
    <div
      className={`xs:p-2 xs:text-xs relative mb-2 inline-flex items-center gap-1 overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% font-semibold tracking-wide text-white md:px-3 md:py-2 dark:text-white ${className} `}
    >
      <span className="">{icon}</span>
      <span>{label}</span>
    </div>
  )
}

export default SectionLabel
