import React, { useCallback, useEffect, useState } from 'react';
import { ItemsList } from './ItemList';
import axios from '../../axios/axios';
import { useToast } from '../../context/ToastContext';
import Pagination from './Pagination';
import CertificateForm from './CertificateForm';
import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button';
import { useAuth } from '../../context/AuthContext';
import { Label } from '../Sections/Education';
import CircleLoader from './CircleLoader';

const CertificatesView = () => {
  const { toast } = useToast();
  const { admin, setAdmin } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editCertificate, setEditCertificate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) setAdmin(JSON.parse(storedAdmin));
  }, [setAdmin]);

  const fetchCertificates = useCallback(
    async (page = 1) => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/certificate/get-certificates?page=${page}`);
        const data = response.data.data;
        setCertificates(data.certifications);
        setTotalPage(data.pages);
        setPageCount(Array.from({ length: data.pages }, (_, i) => i + 1));
        setIsLoading(false);
      } catch (error) {
        const response = error.response;
        const data = response.data;
        toast(data.message, 'error', 3000, 'bottom-right');
      }
    },
    [toast]
  );

  useEffect(() => {
    fetchCertificates(currentPage, 2);
  }, [fetchCertificates, currentPage]);

  const handleUpdateCertificate = async (values, { setSubmitting, setFieldError }) => {
    try {
      const data = {
        title: values.title,
        organization: values.organization,
        issueDate: values.issueDate,
        credentialURL: values.credentialURL
      };

      const response = await axios.put(
        `/certificate/update-certificate/${editCertificate._id}`,
        data
      );
      toast(response.data.message, 'success', 3000, 'bottom-right');
      setShowForm(false);
      setEditCertificate(null);
      fetchCertificates(currentPage);
    } catch (error) {
      const response = error.response;
      const data = response?.data;
      toast(data?.message || 'Update failed', 'error', 3000, 'bottom-right');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCertificate = async id => {
    try {
      const response = await axios.delete(`/certificate/delete-certificate/${id}`);
      const data = response.data;
      fetchCertificates(currentPage);
      toast(data.message, 'success', 3000, 'bottom-right');
    } catch (error) {
      const response = error.response;
      const data = response.data;
      toast(data.message, 'error', 3000, 'bottom-right');
    }
  };

  if (isLoading) {
    return <CircleLoader />;
  }

  return (
    <div className="container mx-auto pb-20">
      <h1 className="mb-6 text-2xl font-bold">{admin ? 'Manage Certificates' : 'Certificates '}</h1>
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.ul
            key={currentPage}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="divide-y divide-neutral-200 rounded-lg bg-white shadow dark:divide-neutral-700 dark:bg-neutral-800"
          >
            {certificates.length === 0 && (
              <li className="sm:text py-6 text-center text-gray-500">No certificates found</li>
            )}
            {certificates.map(certificate => (
              <li
                key={certificate._id}
                className="flex items-center justify-between px-6 py-4 transition hover:bg-neutral-50 dark:hover:bg-neutral-900"
              >
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-lg font-medium  xs:text-sm text-base">
                    {certificate.title}
                  </span>
                  <div className="text-sm text-gray-600 dark:text-gray-300 truncate">
                    {certificate.organization}
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  {admin ? (
                    <>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setEditCertificate(certificate);
                          setShowForm(true);
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteCertificate(certificate._id)}
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <Label link={certificate.credentialURL}>
                      <span className="block sm:hidden">View</span>
                      <span className="hidden sm:block">View certificate</span>
                    </Label>
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
        <div className="bg-opacity-40 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="relative w-full max-w-lg rounded-lg bg-white p-8 shadow-lg dark:bg-neutral-900">
            <h2 className="mb-4 text-xl font-bold">Update Certificate</h2>
            <CertificateForm
              onSubmit={handleUpdateCertificate}
              onCancel={() => {
                setShowForm(false);
                setEditCertificate(null);
              }}
              initialValues={{
                title: editCertificate.title || '',
                organization: editCertificate.organization || '',
                issueDate: editCertificate.issueDate ? editCertificate.issueDate.slice(0, 10) : '',
                credentialURL: editCertificate.credentialURL || ''
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
