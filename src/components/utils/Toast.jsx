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
    icon: <CheckCircle className="text-teal-500 size-4 mt-0.5" />,
    color: "border border-gray-200 bg-white dark:bg-neutral-800 dark:border-neutral-700",
  },
  error: {
    icon: <XCircle className="text-red-500 size-4 mt-0.5" />,
    color: "border border-gray-200 bg-white dark:bg-neutral-800 dark:border-neutral-700",
  },
  warning: {
    icon: <AlertTriangle className="text-yellow-500 size-4 mt-0.5" />,
    color: "border border-gray-200 bg-white dark:bg-neutral-800 dark:border-neutral-700",
  },
  info: {
    icon: <Info className="text-blue-500 size-4 mt-0.5" />,
    color: "border border-gray-200 bg-white dark:bg-neutral-800 dark:border-neutral-700",
  },
};

const positionClasses = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

const Toast = ({ message, type = "info", position = "bottom-right" }) => {
  const { icon, color } = typeStyles[type] || typeStyles.info;
  const pos = positionClasses[position] || positionClasses["top-right"];

  return (
    <div className={`fixed z-50 ${pos}`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        role="alert"
        className={`max-w-md rounded-xl shadow-lg ${color}`}
      >
        <div className="flex p-4">
          <div className="shrink-0">{icon}</div>
          <div className="ms-3">
            <p className="text-sm text-gray-700 dark:text-neutral-400 font-primary">{message}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Toast;
