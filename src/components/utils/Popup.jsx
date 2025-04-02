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
          transition={{ duration: 0.3 }}
          className="fixed inset-0 backdrop-blur-xs backdrop-brightness-50 flex justify-center items-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white p-10 rounded-lg sm:w-full sm:mx-5 lg:mx-0 lg:w-1/3 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <X onClick={onClose} className="absolute right-5 top-5 cursor-pointer" size={20} />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
