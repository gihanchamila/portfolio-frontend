import { motion } from 'motion/react';

const AnimatedButton = ({ github, live }) => {
  return (
    <div className="lg:mt-2 xs:mt-0 flex space-x-3">
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="button dark:bg-white bg-sky-600 hover:bg-sky-700 dark:hover:bg-white/95 dark:text-black text-white"
          aria-label="Open GitHub repository in a new tab"
        >
          <motion.span>GitHub Repo</motion.span>
        </a>
      )}
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className="button bg-sky-700 text-white"
          aria-label="Open live demo in a new tab"
        >
          Live Demo
        </a>
      )}
    </div>
  );
};

export default AnimatedButton;
