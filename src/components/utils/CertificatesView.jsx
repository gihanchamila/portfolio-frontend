import React, { useCallback, useEffect, useState } from 'react';
import { ItemsList } from './ItemList';
import axios from '../../axios/axios';
import { useToast } from '../../context/ToastContext';
import Pagination from './Pagination';
import CertificateForm from './CertificateForm';
import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button';
import { useAuth } from '../../context/AuthContext';

const CertificatesView = () => {
  const { toast } = useToast();
  const { admin, setAdmin } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editCertificate, setEditCertificate] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) setAdmin(JSON.parse(storedAdmin));
  }, [setAdmin]);

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
    fetchCertificates(currentPage, 2);
  }, [fetchCertificates, currentPage]);

  const handleUpdateCertificate = async (values, { setSubmitting, setFieldError }) => {
    try {
      const data = {
        title: values.title,
        organization: values.organization,
        issueDate: values.issueDate,
        credentialURL: values.credentialURL,
      };

      const response = await axios.put(
        `/certificate/update-certificate/${editCertificate._id}`,
        data
      );
      toast(response.data.message, "success", 3000, "bottom-right");
      setShowForm(false);
      setEditCertificate(null);
      fetchCertificates(currentPage);
    } catch (error) {
      const response = error.response;
      const data = response?.data;
      toast(data?.message || "Update failed", "error", 3000, "bottom-right");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCertificate = async (id) => {
    try {
      const response = await axios.delete(`/certificate/delete-certificate/${id}`);
      const data = response.data;
      fetchCertificates(currentPage);
      toast(data.message, 'success', 3000, 'bottom-right');
    } catch (error) {
      const response = error.response;
      const data = response.data;
      toast(data.message, "error", 3000, 'bottom-right');
    }
  };

  return (
    <div className="container mx-auto pb-20">
      <h1 className="text-2xl font-bold mb-6">{admin ? "Manage Certificates" : "Certificates "}</h1>
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.ul
            key={currentPage}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="divide-y divide-neutral-200 dark:divide-neutral-700 bg-white  dark:bg-neutral-800 rounded-lg shadow"
          >
            {certificates.length === 0 && (
              <li className="py-6 text-center text-gray-500 sm:text">No certificates found</li>
            )}
            {certificates.map((certificate) => (
              <li key={certificate._id} className="flex items-center justify-between px-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition">
                <div>
                  <span className="font-medium text-lg">{certificate.title}</span>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">{certificate.organization}</div>
                </div>
                <div className="flex gap-2">{admin && (
                  <>
                  <Button
                    variant='primary'
                    onClick={() => {
                      setEditCertificate(certificate);
                      setShowForm(true);
                    }}
                    
                  >
                    Update
                  </Button>
                  <Button
                    variant='danger'
                    onClick={() => handleDeleteCertificate(certificate._id)}
                  >
                    Delete
                  </Button>
                  </>
                )}
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
      {showForm && editCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 rounded-lg p-8 w-full max-w-lg shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">Update Certificate</h2>
            <CertificateForm
              onSubmit={handleUpdateCertificate}
              onCancel={() => {
                setShowForm(false);
                setEditCertificate(null);
              }}
              initialValues={{
                title: editCertificate.title || "",
                organization: editCertificate.organization || "",
                issueDate: editCertificate.issueDate ? editCertificate.issueDate.slice(0, 10) : "",
                credentialURL: editCertificate.credentialURL || "",
              }}
              isUpdate
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatesView;