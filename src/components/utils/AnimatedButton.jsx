import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const AnimatedButton = ({ github, live }) => {
  return (
    <div className="mt-2 flex space-x-3">
      {github && (
        <Link
          to={github}
          target="_blank"
          rel="noopener noreferrer"
          className="button dark:bg-white bg-sky-600 hover:bg-sky-700 dark:hover:bg-white/95 dark:text-black text-white"
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
