import React from "react";
import { Link } from "react-router-dom";
import { profileImage } from "../../assets";
import AnimatedButton from "./AnimatedButton";
import { motion, useInView} from "motion/react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const ProjectCard = ({ projectName, description, imageUrl, github, live, projectId, index }) => {
  const defaultImage = profileImage;
  const navigate = useNavigate();const ref = useRef(null);
  const isInView = useInView(ref, {once: true, amount: 0.5, rootMargin: '0px 0px -100px 0px'});

  const variants = {
    hidden: { opacity: 0, y: 50 + index * 25},
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.6, ease: 'easeOut' },
    },
  };
 
  return (
    <motion.div 
      className="lg:w-[25rem] lg:h-[30rem] sm:w-auto sm:h-[30rem] xs:h-[25rem] bg-white border border-gray-300 dark:border-none rounded-2xl relative overflow-hidden group"
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      whileTap={{scale : 0.98, rotate: -0.2,}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      viewport={{once : true}}
      
    >
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
        <h2 className="cardTitle drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] cursor-pointer" onClick={() => {navigate(`/project/get-project/${projectId}`)}}>{projectName}</h2>
        <p className="cardSubTitle">{description}</p>
        <AnimatedButton live={live} github={github} />
      </div>
    </motion.div>
  );
};

export default ProjectCard;
