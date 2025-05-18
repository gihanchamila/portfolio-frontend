import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import CertificateCard from '../utils/CertificateCard';
import axios from '../../axios/axios';
import { useToast } from '../../context/ToastContext';
import { motion } from 'motion/react';

const Certificate = () => {

  const { toast } = useToast();

  const [certificates, setCertificates] = useState([]);
  const [totalCount, setTotalCount] = useState([]);

  // Get certification details
  const getCertificateDetails = useCallback(async () => {
    if (certificates.length > 0) return;
    try {
      const response = await axios.get('/certificate/get-certificates');
      const data = response.data.data.certifications;
      const total = response.data.data.total;
      console.log(total)
      setTotalCount(total)
      setCertificates(data);
      toast(`${response.data.message}`)
    } catch (error) {
      const response = error.response;
      const data = response.data;
      toast(`${data.message}`, "error");

    }
  }, [certificates.length, toast]);
  
  useEffect(() => {
    getCertificateDetails();
  }, [getCertificateDetails]);

  return (

    <section
      id="certification"
      className="pb-20 sm:col-start-1 sm:col-end-5 sm-col-span-4 scroll-mt-14"
    >
      <header className="pb-8">
        <motion.h2
          className="sm:text-4xl xs:text-3xl font-bold font-primary"
        >
          <span className="text-sky-500 dark:text-sky-300">Certifications</span> and Achievements
        </motion.h2>
      </header>
    
      <motion.div
        className="sm:grid sm:grid-cols-2 sm:col-span-2 xs:gap-6 xs:flex xs:flex-col"
      >
        {certificates.length > 0 && certificates.map((cert) => (
            <CertificateCard
              key={cert._id}
              certificate={cert}
              certificateName={cert.title}
              organization={cert.organization}
              credentialUrl={cert.credentialURL}
            />
        ))}
        {totalCount > 4 && (
          <div>Show more</div>
        )}
      </motion.div>
    </section>
  );
};

export default Certificate;