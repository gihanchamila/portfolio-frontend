import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const AdminPopUp = ({ open, onClose, title, children }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center pb-4 bg-black/40 dark:bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl lg:p-14 sm:p-10 xs:p-6 w-full max-w-3xl mx-4 relative h-auto max-h-[90vh] flex flex-col"
          initial={{ scale: 0.95, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 40 }}
        >
          <X onClick={onClose} className="absolute right-5 top-5 cursor-pointer" size={24} />
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{title}</h2>
          <div className="flex-1 overflow-y-auto pr-2 pb-6">
            {children}
          </div>
          {/* Button row example */}
          {/* <div className="pt-4 flex justify-end gap-2">
            <Button ...>Cancel</Button>
            <Button ...>Save</Button>
          </div> */}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default AdminPopUp;