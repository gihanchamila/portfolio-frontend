import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlareHover from '../utils/GlareHover';

const skills = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'HTML',
  'CSS',
  'Tailwind',
  'Bootstrap',
  'React',
  'Node.js',
  'Jest',
  'Express',
  'Django',
  'MongoDB',
  'MySQL',
  'npm',
  'Vite',
  'Vitest',
  'Git',
  'GitHub',
  'Figma',
  'VSCode',
  'Visual Studio',
  'AWS'
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const skillVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  }
};

const MySkill = ({ skillsList = skills }) => {
  return (
    <>
      <motion.h2
        className="xs:text-3xl font-primary z-10 pb-8 font-bold sm:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span className="">My Skills</span>
      </motion.h2>
      <motion.div
        className="flex flex-wrap justify-center gap-3 pb-20 lg:justify-start"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skillsList.map(skill => (
          <GlareHover
            key={skill}
            glareColor="#ffffff"
            glareOpacity={0.3}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={800}
            playOnce={false}
          >
            <motion.div
              variants={skillVariants}
              className={`xs:text-xs rounded-xl border border-gray-300 bg-white px-5 py-2 text-sm font-semibold text-gray-900 transition-colors duration-300 sm:text-base lg:text-lg dark:inset-52 dark:border-gray-600 dark:bg-transparent dark:text-gray-100`}
            >
              {skill}
            </motion.div>
          </GlareHover>
        ))}
      </motion.div>
    </>
  );
};

export default MySkill;
