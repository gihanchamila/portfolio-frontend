import React, { useState } from "react";
import { motion } from "framer-motion";
import GlareHover from "../utils/GlareHover";

const skills = [
  "JavaScript", "TypeScript", "Python", "Java", "HTML", "CSS", "Tailwind", "Bootstrap",
  "React", "Node.js", "Jest", "Express", "Django", "MongoDB", "MySQL", "npm", "Vite",
  "Vitest", "Git", "GitHub", "Figma", "VSCode", "Visual Studio", "AWS"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

const MySkill = ({ skillsList = skills }) => {

  return (
    <>
      <motion.h2
        className="sm:text-4xl xs:text-3xl font-bold font-primary pb-8 z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span className="">My Skills</span>
      </motion.h2>
      <motion.div
        className="flex flex-wrap gap-3 justify-center lg:justify-start pb-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skillsList.map((skill) => (
          <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
          >
            <motion.div
              key={skill}
              variants={skillVariants}
              className={`rounded-xl px-5 py-2 text-sm font-semibold 
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-transparent dark:inset-52
                text-gray-900 dark:text-gray-100
                transition-colors duration-300
                xs:text-xs sm:text-base lg:text-lg
              `}
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