import { useCallback, useEffect, useState, useRef } from 'react';
import React from 'react';
import CertificateCard from '../utils/CertificateCard';
import axios from '../../axios/axios';
import { useToast } from '../../context/ToastContext';
import { motion, useAnimation, useInView} from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../utils/Button';
import CircleLoader from '../utils/CircleLoader';

const AnimatedCertificate = ({ certificate, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {once: true, amount: 0.5, rootMargin: '0px 0px -100px 0px'});


  const variants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
    >
      <CertificateCard
        certificate={certificate}
        certificateName={certificate.title}
        organization={certificate.organization}
        credentialUrl={certificate.credentialURL}
      />
    </motion.div>
  );
};

const Certificate = () => {

  const { toast } = useToast();
  const navigate = useNavigate()

  const [certificates, setCertificates] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  
const getCertificateDetails = useCallback(async () => {
  try {
    const response = await axios.get('/certificate/get-certificates?size=4');
    const data = response.data.data.certifications;
    const total = response.data.data.total;
    setTotalCount(total);
    setCertificates(data);
    toast(`${response.data.message}`);
  } catch (error) {
    const response = error?.response;
    const data = response?.data;
    toast(`${data?.message || "Failed to load certificates"}`, "error");
  }
}, [toast]);

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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="">Certifications</span> and Achievements
        </motion.h2>
      </header>
    
      <div className="sm:grid sm:grid-cols-2 sm:col-span-2 xs:gap-6 xs:flex xs:flex-col">
        {certificates.length > 0 &&
          certificates.map((cert, index) => (
            <AnimatedCertificate key={cert._id} certificate={cert} index={index} />
          ))}
        {totalCount > 3 && <span className='cursor-pointer' onClick={() => navigate("certificates")}>Show more</span>}
      </div>
    </section>
  );
};

export default Certificate;