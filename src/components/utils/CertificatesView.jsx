import React, { useCallback, useEffect, useState } from 'react';
import { ItemsList } from './ItemList';
import axios from '../../axios/axios';
import { useToast } from '../../context/ToastContext';
import Pagination from './Pagination';
import { AnimatePresence, motion } from 'motion/react';

const CertificatesView = () => {
  const { toast } = useToast();
  const [certificates, setCertificates] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);

  const fetchCertificates = useCallback(async (page = 1) => {
    try {
      const response = await axios.get(`/certificate/get-certificates?page=${page}`);
      const data = response.data.data;
      setCertificates(data.certifications);
      setTotalPage(data.pages);
      setPageCount(Array.from({ length: data.pages }, (_, i) => i + 1));
    } catch (error) {
      const response = error.response;
      const data = response.data;
      toast(data.message, 'error', 3000, 'bottom-right');
    }
  }, [toast]);

  useEffect(() => {
    fetchCertificates(currentPage);
  }, [fetchCertificates, currentPage]);

  return (
    <div className="container mx-auto pb-20 min-h-[500px] flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Manage Certificates</h1>
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.ul
            key={currentPage}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="divide-y divide-neutral-200 dark:divide-neutral-700 bg-white dark:bg-neutral-800 rounded-lg shadow"
          >
            {certificates.length === 0 && (
              <li className="py-6 text-center text-gray-500">No certificates found</li>
            )}
            {certificates.map((certificate) => (
              <li key={certificate._id} className="flex items-center justify-between px-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition">
                <div>
                  <span className="font-medium text-lg">{certificate.title}</span>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">{certificate.organization}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      // Implement edit logic or open edit modal
                      console.log('Edit certificate:', certificate);
                    }}
                    className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm font-medium shadow"
                  >
                    Update
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const response = await axios.delete(`/certificate/delete/${certificate._id}`);
                        const data = response.data;
                        fetchCertificates(currentPage);
                        toast(data.message, 'success', 3000, 'bottom-right');
                      } catch (error) {
                        const response = error.response;
                        const data = response.data;
                        toast(data.message, "error", 3000, 'bottom-right');
                      }
                    }}
                    className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors text-sm font-medium shadow"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        pageCount={pageCount}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default CertificatesView;