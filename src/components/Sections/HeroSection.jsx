import React from 'react';
import { useState } from 'react';
import SplitText from '../utils/SplitText';
import { profileImage } from '../../assets';
import Skills from './Skills';
import { motion } from 'motion/react';
import CustomCursor from '../utils/CustomCursor';
import SocialLinks from '../utils/SocialLinks';

export const HoverReveal = () => {
  return (
    <motion.div
      className="group relative w-fit cursor-pointer overflow-hidden rounded-full border dark:border-white"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.span
        className="block bg-transparent px-4 py-2 text-xs dark:text-white"
        variants={{
          rest: { y: 0, opacity: 1 },
          hover: { y: -30, opacity: 0 }
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        Available to work
      </motion.span>

      <motion.span
        className="absolute top-7.5 left-0 w-full px-2 py-2 text-center text-xs dark:text-white"
        variants={{
          rest: { y: 30, opacity: 0 },
          hover: { y: -30, opacity: 1 }
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        Let's connect 🤝
      </motion.span>
    </motion.div>
  );
};

const HeroSection = () => {
  const [cursorVisible, setCursorVisible] = useState(false);

  return (
    <div className="relative mb-25">
      <CustomCursor show={cursorVisible} text="Gihan Chamila" />
      <section className="xs:pb-2 gap-5 sm:col-span-4 sm:col-start-1 sm:col-end-5 sm:grid sm:grid-cols-4 sm:items-center lg:grid-cols-12 lg:pb-12">
        {/* Image and HoverReveal for xs/sm screens */}
        <div className="xs:col-span-4 xs:col-start-1 xs:col-end-5 xs:items-center flex flex-col lg:hidden">
          <HoverReveal />
          <div className="xs:flex xs:justify-center xs:mt-2 cursor-none">
            <img
              role="image"
              tabIndex="0"
              src={profileImage}
              onMouseEnter={() => setCursorVisible(true)}
              onMouseLeave={() => setCursorVisible(false)}
              alt="A personal headshot of Gihan Chamila, the developer."
              className="xs:mb-6 xs:mt-5 h-[250px] w-[250px] rounded-2xl lg:mt-0"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="md:items-left xs:mb-20 flex flex-col sm:col-span-4 sm:col-start-1 sm:col-end-5 sm:items-center lg:col-span-5 lg:col-start-1 lg:col-end-6 lg:mb-0">
          <div className="flex flex-col items-center justify-center space-y-6 md:items-start md:justify-start lg:space-y-4">
            {/* Only show HoverReveal on lg screens here */}
            <div className="hidden lg:block">
              <HoverReveal />
            </div>
            <SplitText
              text="Hi, I'm Gihan Chamila"
              className="xs:text-4xl xs:text-center xs:font-bold xs:font-primary xs:mt-0 sm:text-5xl lg:mt-4 lg:text-left lg:text-6xl"
              delay={150}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              easing="easeOutCubic"
              threshold={0.2}
              rootMargin="-50px"
            />
            <h2 className="xs:text-sml font-primary xs:mb-0 text-center font-semibold lg:mb-5 lg:text-left lg:text-2xl">
              A <span className="text-sky-500 dark:text-sky-300">Full Stack Developer</span> with a
              passion for building
              <span className="text-emerald-500 dark:text-emerald-300"> scalable</span>,
              <span className="text-purple-500 dark:text-purple-300"> efficient</span>, and
              <span className="text-orange-500 dark:text-red-300"> user-friendly</span> web
              applications.
            </h2>
            <SocialLinks />
          </div>
        </div>

        {/* Image for lg screens */}
        <div className="hidden cursor-none lg:col-span-6 lg:col-start-9 lg:col-end-13 lg:block">
          <img
            role="image"
            tabIndex="0"
            src={profileImage}
            onMouseEnter={() => setCursorVisible(true)}
            onMouseLeave={() => setCursorVisible(false)}
            alt="A personal headshot of Gihan Chamila, the developer."
            className="xs:w-[200px] xs:h-[200px] xs:mt-5 rounded-2xl lg:mt-0 lg:mb-0 lg:h-[380px] lg:w-[400px] 2xl:h-[400px] 2xl:w-[400px]"
          />
        </div>
      </section>
      <Skills />
    </div>
  );
};

export default HeroSection;
