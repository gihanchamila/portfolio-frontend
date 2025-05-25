import React from 'react';
import { ItemsList } from './ItemList';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../axios/axios';
import { useToast } from '../../context/ToastContext';

const CertificatesView = () => {
  const { toast } = useToast();
  const [certificates, setCertificates] = useState([]);

  const fetchCertificates = useCallback(async () => {
    try {
      const response = await axios.get('/certificate/get-certificates');
      const certificates = response.data.data.certifications
      setCertificates(certificates);
    } catch (error) {
      const response = error.response
      const data = response.data
      toast(data.message, 'error', 3000, 'bottom-right');
    }
  }, [toast]);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  return (
    <div className="container mx-auto pb-20">
      <h1 className="text-2xl font-bold mb-6">Manage Certificates</h1>
      <ItemsList
        items={certificates}
        type="certificates"
        onEdit={(certificate) => {
          console.log('Edit certificate:', certificate);
        }}
        onDelete={async (id) => {
          try {
            const response = await axios.delete(`/certificate/delete/${id}`);
            const data = response.data;
            fetchCertificates();
            toast(data.message, 'success', 3000, 'bottom-right');
          } catch (error) {
            const response = error.response;
            const data = response.data
            toast(data.message, "false", 300, 'bottom-right')
          }
        }}
      />
    </div>
  );
};

export default CertificatesView;