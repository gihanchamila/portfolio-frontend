import { motion } from 'framer-motion';
import { usePrevious } from '../hooks/usePrevious';
import NavLinks from './NavLinks';
import ResumeDownload from './utils/ResumeDownload';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';
import ThemeToggle from './utils/ThemeToggle';
import Button from './utils/Button';
import { span } from 'framer-motion/client';
import { Link } from 'react-router-dom';

const DesktopMenu = ({ navLinks, isShrunk }) => {
  const { admin, signOut } = useAuth();
  const prev = usePrevious(isShrunk);

  const isShrinking = prev === false && isShrunk === true;
  const isExpanding = prev === true && isShrunk === false;

  return (
    <motion.header
      className={`
        hidden lg:grid
        h-24
        col-span-4 rounded-lg
        sm:col-start-1 sm:col-end-4
        lg:col-span-10 lg:col-start-2 lg:col-end-12
        ${isShrunk ? '' : ''} 
      `}
    >
      <motion.div
        initial={false}
        animate={isShrinking ? { y: 0 } : isExpanding ? { y: 0 } : {}}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="flex items-center justify-between gap-5 px-5"
      >
        <motion.div
          initial={false}
          animate={isShrinking ? { y: 0 } : isExpanding ? { y: 0 } : {}}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          <NavLinks links={navLinks} />
        </motion.div>

        <motion.div
          initial={false}
          animate={isShrinking ? { y: 0 } : isExpanding ? { y: 0 } : {}}
          transition={{ duration: 0.22, ease: 'easeOut', delay: 0.02 }}
          className="flex items-center gap-4"
        >
          <ThemeToggle />
          {/* <ResumeDownload /> */}
          <Button
            as="a"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=algihanchamila@gmail.com&su=Request%20Resume"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="hidden sm:flex"
          >
            Request Resume
          </Button>
          {admin && (
            <Button variant="outline" onClick={signOut} className="flex items-center gap-2">
              Log Out
            </Button>
          )}
        </motion.div>
      </motion.div>
    </motion.header>
  );
};

export default DesktopMenu;
