import React from "react";
import { Link } from "react-router-dom";
import { ProjectImage } from "../../assets";
import AnimatedButton from "./AnimatedButton";
import { motion } from "motion/react";

const ProjectCard = ({ projectName, description, imageUrl, github, live }) => {
  const defaultImage = ProjectImage;

  return (
    <motion.div initial={{opacity : 0}}  whileInView={{opacity : 1}} className="w-[25rem] h-[30rem] bg-white border border-gray-300 rounded-2xl relative overflow-hidden group">

      <motion.img
        src={imageUrl || defaultImage}
        alt={projectName}
        className="w-full h-full object-cover absolute inset-0"
      />

      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"></div>

      <div className="absolute bottom-0 p-4 text-white w-full flex flex-col space-y-3">
        <h2 className="text-2xl font-bold line-clamp-2 min-h-[2.5rem] font-primary">{projectName}</h2>
        <p className="text-md font-primary line-clamp-3 min-h-[4rem]">{description}</p>
        <AnimatedButton live={live} github={github} />
      </div>
      
    </motion.div>
  );
};

export default ProjectCard;
