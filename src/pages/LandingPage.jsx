import React, { lazy, Suspense } from 'react';
import CircleLoader from '../components/utils/CircleLoader';

const HeroSection = lazy(() => import('../components/Sections/HeroSection'));
const FeaturedProjects = lazy(() => import('../components/Sections/FeaturedProjects'));
const Certificate = lazy(() => import('../components/Sections/Certificate'));
const ContactSection = lazy(() => import('../components/Sections/ContactSection'));
const MySkill = lazy(() => import('../components/Sections/MySkill'));
const Education = lazy(() => import('../components/Sections/Education'));

const LandingPage = () => {
  return (
    <Suspense fallback={<CircleLoader />}>
      <HeroSection />
      <MySkill />
      <FeaturedProjects />
      <Education />
      <Certificate />
      <ContactSection />
    </Suspense>
  );
};

export default LandingPage;
