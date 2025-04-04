import React from 'react'
import ScrollVelocity from '../utils/ScrollVelocity'

const Skills = () => {
  return (
      <section className='pb-20'>
          <ScrollVelocity
              texts={["Great things are done by a series of small things brought together!"]}
              className="text-blue-500 dark:text-blue-300 font-primary"
          />
      </section>
    
  )
}

export default Skills