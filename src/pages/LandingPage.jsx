import React from 'react'
import HeroSection from '../components/Sections/HeroSection'
import Skills from '../components/Skills'
import FeaturedProjects from '../components/Sections/FeaturedProjects'
import GridContainer from '../components/GridContainer'

const LandingPage = () => {
  return (
    <>
        <HeroSection />
        <Skills />
        <FeaturedProjects />
    </>
    
  )
}

export default LandingPage