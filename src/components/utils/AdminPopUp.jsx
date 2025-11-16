import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const AdminPopUp = ({ open, onClose, title, children }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 pb-4 dark:bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="xs:p-6 relative mx-4 flex h-auto max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl sm:p-10 lg:p-14 dark:bg-neutral-900"
          initial={{ scale: 0.95, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 40 }}
        >
          <X onClick={onClose} className="absolute top-5 right-5 cursor-pointer" size={24} />
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <div className="flex-1 overflow-y-auto pr-2 pb-6">{children}</div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default AdminPopUp;
