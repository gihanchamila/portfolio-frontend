import React from 'react';
import { BackgroundLines } from '../utils/AnimatedBackground';
import SplitText from '../utils/SplitText';

const HeroSection = () => {
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    <div className="relative">
      <BackgroundLines  svgOptions={{ duration: 10 }}>
        <section className="grid grid-cols-12 gap-5 items-center pb-12">
          {/* Text Content */}
          <div className="col-span-12 lg:col-start-1 lg:col-end-6">
            <div className="lg:flex lg:flex-col space-y-3 justify-evenly">
              <SplitText
                text="Hi, I'm Gihan Chamila"
                className="text-6xl font-bold font-primary"
                delay={150}
                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                easing="easeOutCubic"
                threshold={0.2}
                rootMargin="-50px"
                onLetterAnimationComplete={handleAnimationComplete}
              />
              <h2 className="text-2xl font-semibold">
                A <span className="text-sky-500">Full Stack Developer</span> with a passion for building
                <span className="text-emerald-500"> scalable</span>,
                <span className="text-purple-500"> efficient</span>, and
                <span className="text-orange-500"> user-friendly</span> web applications.
              </h2>
            </div>
          </div>

          {/* Image Content */}
          <div className="col-span-12 lg:col-start-7 lg:col-end-13 flex justify-end">
            <img
              src="/path-to-your-image.jpg"
              alt="Hero Section Illustration"
              className="w-[400px] h-[400px] rounded-full bg-black"
            />
          </div>
        </section>
      </BackgroundLines>
    </div>
   
    
  );
};

export default HeroSection;