import React from "react";
import { Link } from "react-router-dom";
import { ProjectImage } from "../../assets";
import AnimatedButton from "./AnimatedButton";
import { motion} from "motion/react";

const ProjectCard = ({ projectName, description, imageUrl, github, live }) => {
  const defaultImage = ProjectImage;

  return (
    <motion.div className="lg:w-[25rem] lg:h-[30rem] sm:w-auto sm:h-[30rem] xs:h-[20rem] bg-white border border-gray-300 dark:border-none rounded-2xl relative overflow-hidden group">
      <motion.div 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 1.1 }}
        transition={{ duration: 0.3 }} 
        className="relative w-full h-full overflow-hidden"
      >
        <img
          src={imageUrl || defaultImage}
          alt={projectName}
          className="w-full h-full object-cover absolute inset-0"
          loading="lazy"
        />

        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"></div>
      </motion.div>

      <div className="absolute bottom-0 p-4 text-white w-full flex flex-col sm:space-y-3 xs:space-y-2">
        <h2 className="cardTitle drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]">{projectName}</h2>
        <p className="cardSubTitle">{description}</p>
        <AnimatedButton live={live} github={github} />
      </div>
    </motion.div>
  );
};

export default ProjectCard;
