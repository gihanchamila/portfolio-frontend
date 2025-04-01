import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const AnimatedButton = ({ github, live }) => {
  return (
    <div className="mt-4 flex space-x-3">
      {github && (
        <Link
          to={github}
          target="_blank"
          rel="noopener noreferrer"
          className="w-auto bg-white text-black text-center px-4 py-2 rounded-lg font-primary flex items-center space-x-2"

        >
          <motion.span>GitHub Repo</motion.span>
        </Link>
      )}
      {live && (
        <Link
          to={live}
          target="_blank"
          rel="noopener noreferrer"
          className="w-auto bg-sky-500 text-white text-center px-4 py-2 rounded-lg font-primary flex items-center space-x-2"
        >
          <span>Live Demo</span>
        </Link>
      )}
    </div>
  );
};

export default AnimatedButton;
