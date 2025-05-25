import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const AdminPopUp = ({ open, onClose, title, children }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg lg:p-10 sm:p-8 xs:p-6 w-full max-w-lg mx-4 relative h-auto max-h-[80vh] flex flex-col"
          initial={{ scale: 0.95, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 40 }}
        >

            <X onClick={onClose} className="absolute right-5 top-5 cursor-pointer"   size={20}
            />
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
          <div className="overflow-y-auto flex-1 pr-2">
            {children}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default AdminPopUp;