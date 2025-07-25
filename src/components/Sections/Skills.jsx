import React from 'react'
import ScrollVelocity from '../utils/ScrollVelocity'

const Skills = () => {
  return (
      <section className='lg:pb-20 xs:pb-15 xs:hidden lg:flex'>
          <ScrollVelocity
              texts={["Great things are done by a series of small things brought together!"]}
              className="text-blue-500 dark:text-blue-300 font-primary xs:mt-25 sm:mt-0 lg:mt-20"
          />
      </section>
  )
}

export default Skills