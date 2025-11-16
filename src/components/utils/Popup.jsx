import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Popup = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
            className="dark:bg-on-surface xs:px-5 xs:py-8 xs:w-full xs:mx-5 relative rounded-lg bg-white sm:p-10 lg:mx-0 lg:w-1/3"
            onClick={e => e.stopPropagation()}
          >
            <X onClick={onClose} className="absolute top-5 right-5 cursor-pointer" size={20} />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
