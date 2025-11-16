import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const AnimatedButton = ({ github, live }) => {
  return (
    <div className="mt-4 flex space-x-3">
      {github && (
        <Link
          to={github}
          target="_blank"
          rel="noopener noreferrer"
          className="button bg-white text-black"
        >
          <motion.span role="link">GitHub Repo</motion.span>
        </Link>
      )}
      {live && (
        <Link
          to={live}
          target="_blank"
          rel="noopener noreferrer"
          className="button bg-sky-700 text-white"
        >
          <span role="link">Live Demo</span>
        </Link>
      )}
    </div>
  );
};

export default AnimatedButton;
