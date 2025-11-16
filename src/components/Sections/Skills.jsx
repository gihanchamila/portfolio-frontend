import React from 'react'
import ScrollVelocity from '../utils/ScrollVelocity'

const Skills = () => {
  return (
    <section className="xs:pb-15 xs:hidden lg:flex lg:pb-20">
      <ScrollVelocity
        texts={['Great things are done by a series of small things brought together!']}
        className="font-primary xs:mt-25 text-blue-500 sm:mt-0 lg:mt-20 dark:text-blue-300"
      />
    </section>
  )
}

export default Skills
