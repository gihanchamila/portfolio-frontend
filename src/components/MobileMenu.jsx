import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import GridContainer from './GridContainer';
import { Menu, X } from 'lucide-react';
import { profileImage } from '../assets/index';
import NavLinks from './NavLinks';
import { motion } from 'motion/react';
import { AnimatePresence } from 'motion/react';
import ResumeDownload from './utils/ResumeDownload';
import ThemeToggle from './utils/ThemeToggle';

const MobileMenu = ({ navLinks }) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <GridContainer>
      <header className="dark:bg-surface mt-5 mb-16 sm:col-span-4 sm:col-start-1 sm:col-end-5 sm:grid lg:hidden">
        <div className="flex w-full items-center justify-between">
          <img
            src={profileImage}
            alt="profile"
            className="xs:h-8 xs:w-8 rounded-full bg-black sm:h-10 sm:w-10"
            role="image"
          />
          <motion.div transition={{ duration: 0.2 }}>
            {!isOpen && (
              <Menu onClick={toggleMenu} aria-label="Toggle menu" className="cursor-pointer" />
            )}
          </motion.div>
        </div>
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black opacity-50"
            onClick={toggleMenu}
            aria-label="Backdrop"
          />
        )}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
              ref={ref}
              className="xs:w-1-2 dark:bg-surface fixed top-0 right-0 z-50 flex h-screen flex-col overflow-hidden rounded-l-2xl bg-white px-10 py-5 sm:w-[20rem]"
            >
              <div className="absolute top-8 right-7 left-7 flex items-center justify-between">
                <motion.div
                  className="ml-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  <ThemeToggle />
                </motion.div>

                <X onClick={toggleMenu} className="cursor-pointer" />
              </div>

              <div className="xs:flex xs:flex-col xs:space-y-4 xs:w-auto mt-20 md:block">
                <NavLinks links={navLinks} />
                <div className="mt-5">
                  <ResumeDownload />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </GridContainer>
  );
};

export default MobileMenu;
