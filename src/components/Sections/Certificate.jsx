import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import CertificateCard from '../utils/CertificateCard';
import axios from '../../axios/axios';
import { useToast } from '../../context/ToastContext';

const certifications = [
  {
    certificateName: "Meta Frontend Developer Professional Certificate",
    organization: "Meta",
    credentialUrl: "www."
  },
  {
    certificateName: "Google UX Design Professional Certificate",
    organization: "Google",
    credentialUrl: "www."
  },
  {
    certificateName: "AWS Certified Solutions Architect",
    organization: "Amazon AWS",
    credentialUrl: "www."
  },
  {
    certificateName: "Microsoft Certified: Azure Fundamentals",
    organization: "Microsoft",
    credentialUrl: "www."
  },
];

const Certificate = () => {

  const { addToast } = useToast();

  const [certificate, setCertificate] = useState([]);

  const getCertificateDetails = useCallback(async () => {
    try {
      const response = await axios.get('/certificate/get-certificates');
      const data = response.data.data;
      setCertificate(data);
      addToast(response.data.message, "success", 3000, "bottom-right");
    } catch (error) {
      console.error("Error fetching certificate details:", error);
      addToast("Error fetching certificates", "error", 3000, "bottom-right");
    }
  }, [addToast]);
  
  useEffect(() => {
    getCertificateDetails();
  }, [getCertificateDetails]);

  return (
        <section id='certification' className="pb-20 sm:col-start-1 sm:col-end-5 sm-col-span-4 scroll-mt-14">
          <header className="pb-8">
            <h2 className="sm:text-4xl xs:text-3xl font-bold font-primary">
              <span className="text-sky-500 dark:text-sky-300">Certifications</span> and Achievements
            </h2>
          </header>
          <div className='sm:grid sm:grid-cols-2 sm:col-span-2 xs:gap-6 xs:flex xs:flex-col'>
            {certifications.map((cert, index) => (
              <CertificateCard 
                key={index} 
                certificateName={cert.certificateName} 
                organization={cert.organization} 
                credentialUrl={cert.credentialUrl}
              />
            ))}
          </div>
        </section>
  );
};

export default Certificate;