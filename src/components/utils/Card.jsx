import React from "react";
import { Link } from "react-router-dom";
import { ProjectImage } from "../../assets";

const ProjectCard = ({ projectName, organization, description, buttonText, imageUrl, github, live }) => {
  const defaultImage = ProjectImage;

  return (
    <div className="w-[25rem] h-[30rem] bg-white border border-gray-300 rounded-2xl relative overflow-hidden group">
      {/* Background Image */}
      <img
        src={imageUrl || defaultImage}
        alt={projectName}
        className="w-full h-full object-cover absolute inset-0 transition-transform duration-300 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"></div>

      {/* Content Section */}
      <div className="absolute bottom-0 p-4 text-white w-full flex flex-col space-y-3">
        <h2 className="text-2xl font-bold line-clamp-2 min-h-[2.5rem] font-primary">{projectName}</h2>
        <p className="text-md font-primary line-clamp-3 min-h-[4rem]">{description}</p>

        {/* Buttons Section */}
        <div className="mt-4 flex space-x-3">
          {github && (
            <Link
              to={github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-auto bg-white text-black text-center px-2 py-2 rounded-lg font-primary "
            >
              GitHub Repo
            </Link>
          )}
          {live && (
            <Link
              to={live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-auto bg-sky-500 text-white text-center px-2 py-2 rounded-lg font-primary "
            >
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
