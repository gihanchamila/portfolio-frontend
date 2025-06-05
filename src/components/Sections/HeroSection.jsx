import React from 'react';
import { useState } from 'react';
import SplitText from '../utils/SplitText';
import { ProjectImage } from '../../assets';
import Skills from './Skills'
import MySkill from './MySkill';
import { motion } from 'motion/react';
import CustomCursor from '../utils/CustomCursor';


export const HoverReveal = () => {
  return (
    <motion.div
      className="relative w-fit group overflow-hidden border dark:border-white rounded-full cursor-pointer"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Initial Text */}
      <motion.span
        className="block py-2 px-4 dark:text-white text-xs bg-transparent"
        variants={{
          rest: { y: 0, opacity: 1 },
          hover: { y: -30, opacity: 0 },
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        Available to work
      </motion.span>

      <motion.span
        className="absolute left-0 top-7.5 py-2 px-2 dark:text-white text-xs w-full text-center"
        variants={{
          rest: { y: 30, opacity: 0 },
          hover: { y: -30, opacity: 1 },
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        Let's connect 🤝 
      </motion.span>
    </motion.div>
  );
};


const HeroSection = () => {
  const [cursorVisible, setCursorVisible] = useState(false);

  return (
    <div className="relative">
        <CustomCursor show={cursorVisible} text="Gihan Chamila" />
        <section className="sm:grid sm:grid-cols-4 sm:col-start-1 sm:col-end-5 sm:col-span-4 gap-5 sm:items-center lg:pb-12 xs:pb-2 lg:grid-cols-12">
          <div className="sm:col-span-4 sm:col-start-1 sm:col-end-5 flex flex-col sm:items-center md:items-left  lg:col-span-5 lg:col-start-1 lg:col-end-6">
            <div className="flex flex-col items-center justify-center space-y-6 md:items-start md:justify-start lg:space-y-4">
              <HoverReveal />
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
              onMouseEnter={() => setCursorVisible(true)}
              onMouseLeave={() => setCursorVisible(false)}
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
