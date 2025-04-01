import React from 'react'
import ScrollVelocity from './utils/ScrollVelocity'
import { section } from 'framer-motion/client'

const Skills = () => {
  return (
    <section className='pb-12'>
        <ScrollVelocity
            texts={["Hey there! Let's connect", "Let's create something amazing together!"]}
            className="text-blue-500 font-primary"
        />
    </section>
    
  )
}

export default Skills