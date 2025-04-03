import React from 'react'
import HeroSection from '../components/Sections/HeroSection'
import FeaturedProjects from '../components/Sections/FeaturedProjects'
import Certificate from '../components/Sections/Certificate'
import ContactSection from '../components/Sections/ContactSection'

const LandingPage = () => {
  function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
    console.log(`Profiler ID: ${id}`);
    console.log(`Phase: ${phase}`); // "mount" or "update"
    console.log(`Render time: ${actualDuration.toFixed(2)}ms`);
    console.log(`Base duration: ${baseDuration.toFixed(2)}ms`);
    console.log(`Start time: ${startTime}`);
    console.log(`Commit time: ${commitTime}`);

    if (actualDuration < 50) {
        console.log("✅ Performance is GOOD!");
        console.log(actualDuration)
    } else if (actualDuration >= 50 && actualDuration < 100) {
        console.log("⚠️ Performance is AVERAGE. Consider optimization.");
    } else {
        console.log("❌ Performance is BAD! Optimize this component.");
    }
}
  return (
    <>
        <HeroSection />
        <FeaturedProjects />
        <Certificate />
        <ContactSection />
    </>
    
  )
}

export default LandingPage