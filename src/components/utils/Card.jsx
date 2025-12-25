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
      className="
        group overflow-hidden rounded-2xl
        border border-gray-300 dark:border-white/10
        bg-white dark:bg-transparent
        transition-all duration-300 dark:hover:neutral-800
        lg:h-[29rem]
        xs:h-[27rem]
      "
    >
      <div className="relative h-1/2 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={projectName}
          fetchPriority="high"
          loading="lazy"
          className="
            h-full w-full object-cover
            transition-transform duration-500
          "
        />
      </div>

      <div className="flex h-1/2 flex-col justify-between p-5">
        <div className="space-y-2">
          <h2
            onClick={handleNavigate}
            className="
              cardTitle cursor-pointer
              text-gray-900 dark:text-white
              hover:text-sky-500
              transition-colors
            "
          >
            {projectName}
          </h2>

          <p className="cardSubTitle text-gray-700 dark:text-gray-300">{description}</p>
        </div>

        <AnimatedButton live={live} github={github} />
      </div>
    </div>
  );
};

export default ProjectCard;
