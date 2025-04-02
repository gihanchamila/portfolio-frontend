import React from 'react'
import HeroSection from '../components/Sections/HeroSection'
import Skills from '../components/Sections/Skills'
import FeaturedProjects from '../components/Sections/FeaturedProjects'
import Certificate from '../components/Sections/Certificate'
import ContactSection from '../components/Sections/ContactSection'

const LandingPage = () => {
  return (
    <>
        <HeroSection />
        <Skills />
        <FeaturedProjects />
        <Certificate />
        <ContactSection />
    </>
    
  )
}

export default LandingPage