import React from 'react'

const SkillCard = ({ text }) => {
  return (
    <span className="rounded-lg p-2 text-sm dark:border-2 dark:border-white dark:text-white">
      {text}
    </span>
  )
}

export default SkillCard
