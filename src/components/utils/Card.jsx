import React, { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedButton from './AnimatedButton';

const ProjectCard = ({ projectName, description, imageUrl, github, live, projectId }) => {
  const navigate = useNavigate();
  const ref = useRef(null);

  const handleNavigate = useCallback(() => {
    navigate(`/project/get-project/${projectId}`);
  }, [navigate, projectId]);

  return (
    <div
      ref={ref}
      className="xs:h-[25rem] group relative overflow-hidden rounded-2xl border border-gray-300  sm:h-[32rem] dark:border-none"
    >
      <div className="relative h-full w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={projectName}
          className="absolute inset-0 h-full w-full object-fill"
          loading="lazy"
        />

        <div
          className="
            absolute inset-0 
            bg-gradient-to-t 
            from-black/90 
            via-black/40 
            to-transparent 
            opacity-90 
            transition-opacity 
            duration-300 
            group-hover:opacity-100
          "
        ></div>
      </div>

      <div className="absolute bottom-0 w-full p-4 text-white xs:space-y-2 sm:space-y-3">
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
