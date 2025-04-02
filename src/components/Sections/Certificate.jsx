import React from 'react';
import CertificateCard from '../utils/CertificateCard';

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
  return (
    <section className="pb-12 sm:col-start-1 sm:col-end-5 sm-col-span-4">
      <header className="pb-8">
        <h2 className="text-4xl font-bold font-primary">
          <span className="text-sky-500">Certifications</span> and Achievements
        </h2>
      </header>
      <div className='sm:grid sm:grid-cols-2 sm:col-span-2 gap-5'>
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