import React, { useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { profileImage } from '../../assets';
import Reveal from '../utils/Reveal';
import AnimatedButton from './AnimatedButton';

const ProjectCard = ({ projectName, description, imageUrl, github, live, projectId }) => {
  const defaultImage = profileImage;
  const navigate = useNavigate();
  const ref = useRef(null);

  const handleNavigate = useCallback(() => {
    navigate(`/project/get-project/${projectId}`);
  }, [navigate, projectId]);

  return (
    <div
      ref={ref}
      className="xs:h-[25rem] group relative overflow-hidden rounded-2xl border border-gray-300 bg-white sm:h-[30rem] sm:w-auto lg:h-[30rem] lg:w-[25rem] dark:border-none"
    >
      <div className="relative h-full w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={projectName}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />

        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>

      <div className="xs:space-y-2 absolute bottom-0 flex w-full flex-col p-4 text-white sm:space-y-3">
        <h2
          className="cardTitle cursor-pointer drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]"
          onClick={handleNavigate}
        >
          {projectName}
        </h2>
        <p className="cardSubTitle">{description}</p>
        <AnimatedButton live={live} github={github} />
      </div>
    </div>
  );
};

export default ProjectCard;
