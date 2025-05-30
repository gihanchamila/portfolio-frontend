import React from 'react';
import SplitText from '../utils/SplitText';
import { ProjectImage } from '../../assets';
import Skills from './Skills'
import MySkill from './MySkill';

const HeroSection = () => {

  return (
    <div className="relative">
        <section className="sm:grid sm:grid-cols-4 sm:col-start-1 sm:col-end-5 sm:col-span-4 gap-5 sm:items-center lg:pb-12 xs:pb-2 lg:grid-cols-12">
          <div className="sm:col-span-4 sm:col-start-1 sm:col-end-5 flex flex-col sm:items-center lg:col-span-5 lg:col-start-1 lg:col-end-6">
            <div className="xs:flex xs:flex-col lg:space-y-4 xs:space-y-6 justify-evenly">
              <SplitText
                text="Hi, I'm Gihan Chamila"
                className="lg:text-6xl sm:text-5xl xs:text-4xl xs:text-center xs:font-bold xs:font-primary lg:text-left"
                delay={150}
                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                easing="easeOutCubic"
                threshold={0.2}
                rootMargin="-50px"
              />
              <h2 className="lg:text-2xl sm:text-xl text-center lg:text-left font-semibold font-primary">
                A <span className="dark:text-sky-300 text-sky-500 ">Full Stack Developer</span> with a passion for building
                <span className="text-emerald-500 dark:text-emerald-300"> scalable</span>,
                <span className="text-purple-500 dark:text-purple-300"> efficient</span>, and
                <span className="text-orange-500 dark:text-red-300"> user-friendly</span> web applications.
              </h2>
            </div>
          </div>

          <div className="xs:col-span-4 xs:col-start-1 xs:col-end-5 xs:flex xs:justify-center lg:block lg:col-span-6 lg:col-start-9 lg:col-end-13 xs:mt-5">
            <img
              src={ProjectImage}
              alt="Hero Section Illustration"
              className="w-[200px] h-[200px] lg:w-[400px] lg:h-[400px] rounded-full"
            />
          </div>
        </section>
        <MySkill />
      <Skills />
    </div>
  );
};

export default HeroSection;
