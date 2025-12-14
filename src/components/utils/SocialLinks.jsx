import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram } from 'lucide-react';
import clsx from 'clsx';

const iconStyles = {
  hero: 'w-7 h-7 sm:w-6 sm:h-6',
  footer: 'w-6 h-6'
};

const linkPadding = {
  hero: 'lg:py-0 xs:py-4',
  footer: ''
};

const SocialLinks = ({ variant, size = 'footer' }) => {
  return (
    <motion.div className="mt-2 flex gap-4" variants={variant}>
      {[Github, Linkedin, Instagram].map((Icon, index) => (
        <motion.a
          key={index}
          href={
            [
              'https://github.com/gihanchamila',
              'https://www.linkedin.com/in/algihanchamila',
              'https://www.instagram.com/zander_xz'
            ][index]
          }
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={clsx('rounded-full transition hover:text-gray-500', linkPadding[size])}
        >
          <Icon className={clsx(iconStyles[size])} />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialLinks;
