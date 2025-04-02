import React from 'react'
import HeroSection from '../components/Sections/HeroSection'
import Skills from '../components/Skills'
import FeaturedProjects from '../components/Sections/FeaturedProjects'
import GridContainer from '../components/GridContainer'
import Certificate from '../components/Sections/Certificate'

const LandingPage = () => {
  return (
    <>
        <HeroSection />
        <Skills />
        <FeaturedProjects />
        <Certificate />
    </>
    
  )
}

export default LandingPage