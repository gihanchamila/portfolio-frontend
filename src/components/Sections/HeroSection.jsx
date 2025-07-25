import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import SplitText from '../utils/SplitText';
import { profileImage } from '../../assets';
import Skills from './Skills'
import { motion } from 'motion/react';
import CustomCursor from '../utils/CustomCursor';
import Button from '../utils/Button';
import { useNavigate } from 'react-router-dom';
import SocialLinks from '../utils/SocialLinks';


export const HoverReveal = () => {
  return (
    <motion.div
      className="relative w-fit group overflow-hidden border dark:border-white rounded-full cursor-pointer"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
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
          {/* Image and HoverReveal for xs/sm screens */}
          <div className="flex flex-col xs:col-span-4 xs:col-start-1 xs:col-end-5 xs:items-center lg:hidden">
            <HoverReveal />
            <div className="xs:flex xs:justify-center xs:mt-2 cursor-none">
              <img
                role='image'
                tabIndex="0"
                src={profileImage}
                onMouseEnter={() => setCursorVisible(true)}
                onMouseLeave={() => setCursorVisible(false)}
                alt="A personal headshot of Gihan Chamila, the developer."
                className="w-[200px] h-[200px] rounded-full xs:mb-6 xs:mt-5 lg:mt-0"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="sm:col-span-4 sm:col-start-1 sm:col-end-5 flex flex-col sm:items-center md:items-left lg:col-span-5 lg:col-start-1 lg:col-end-6 xs:mb-20 lg:mb-0">
            <div className="flex flex-col items-center justify-center space-y-6 md:items-start md:justify-start lg:space-y-4">
              {/* Only show HoverReveal on lg screens here */}
              <div className="hidden lg:block">
                <HoverReveal />
              </div>
              <SplitText
                text="Hi, I'm Gihan Chamila"
                className="lg:text-6xl sm:text-5xl xs:text-4xl xs:text-center xs:font-bold xs:font-primary lg:text-left xs:mt-0 lg:mt-4"
                delay={150}
                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                easing="easeOutCubic"
                threshold={0.2}
                rootMargin="-50px"
              />
              <h2 className="lg:text-2xl xs:text-sml text-center lg:text-left font-semibold font-primary xs:mb-0 lg:mb-5 ">
                A <span className="dark:text-sky-300 text-sky-500 ">Full Stack Developer</span> with a passion for building
                <span className="text-emerald-500 dark:text-emerald-300"> scalable</span>,
                <span className="text-purple-500 dark:text-purple-300"> efficient</span>, and
                <span className="text-orange-500 dark:text-red-300"> user-friendly</span> web applications.
              </h2>
              <SocialLinks />
            </div>
          </div>

          {/* Image for lg screens */}
          <div className="hidden lg:block lg:col-span-6 lg:col-start-9 lg:col-end-13 cursor-none">
            <img
              role='image'
              tabIndex="0"
              src={profileImage}
              onMouseEnter={() => setCursorVisible(true)}
              onMouseLeave={() => setCursorVisible(false)}
              alt="A personal headshot of Gihan Chamila, the developer."
              className="lg:w-[400px] lg:h-[400px] xs:w-[200px] xs:h-[200px] rounded-full lg:mb-0 xs:mt-5 lg:mt-0"
            />
          </div>
        </section>
      <Skills />
    </div>
  );
};

export default HeroSection;
