import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  AlertTriangle,
  Info,
  XCircle,
} from "lucide-react"; // these are pretty icons!

const typeStyles = {
  success: {
    icon: <CheckCircle className="xs:text-teal-500 toastIcon" />,
    color: "border border-gray-200 bg-white dark:bg-neutral-800 dark:border-neutral-700",
  },
  error: {
    icon: <XCircle className="xs:text-red-500 toastIcon" />,
    color: "border border-gray-200 bg-white dark:bg-neutral-800 dark:border-neutral-700",
  },
  warning: {
    icon: <AlertTriangle className="xs:text-yellow-500 toastIcon" />,
    color: "border border-gray-200 bg-white dark:bg-neutral-800 dark:border-neutral-700",
  },
  info: {
    icon: <Info className="xs:text-blue-500 toastIcon" />,
    color: "border border-gray-200 bg-white dark:bg-neutral-800 dark:border-neutral-700",
  },
};



const Toast = ({ message, type = "info"}) => {
  const { icon, color } = typeStyles[type] || typeStyles.info;

  return (
    <div className={`fixed z-50`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        role="alert"
        className={`w-full max-w-xs sm:max-w-sm md:max-w-md rounded-lg ${color}`}
      >
        <div className="flex px-3 py-2">
          <div className="shrink-0">{icon}</div>
          <div className="ms-3">
            <p className="sm:text-sm xs:text-xs text-gray-700 dark:text-neutral-400 font-primary">{message}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Toast;
