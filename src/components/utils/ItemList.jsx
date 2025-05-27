import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import Pagination from "./Pagination";

export const ItemsList = ({ items, onEdit, onDelete, type, pageCount, currentPage, totalPage }) => {

  return (
    <div className="overflow-y-auto">
      {items.length === 0 ? (
        <motion.p
          className="text-center text-gray-500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          No {type} found
        </motion.p>
      ) : (
        <>
          <AnimatePresence>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
            >
              {items.map((item) => (
                <motion.div
                  key={item._id}
                  className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-md hover:shadow-2xl transition-shadow border border-neutral-200 dark:border-neutral-700 group relative"
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.96 }}
                  transition={{ duration: 0.35, type: "spring" }}
                  whileHover={{
                    scale: 1.025,
                    boxShadow: "0 12px 32px rgba(0,0,0,0.14)",
                    y: -4,
                  }}
                >
                  <div>
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {type === "projects" ? item.subtitle : item.organization}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        onClick={() => onEdit(item)}
                        varient="primary"
                      >
                        Update
                      </Button>
                      <Button
                        onClick={() => onDelete(item._id)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  );
};