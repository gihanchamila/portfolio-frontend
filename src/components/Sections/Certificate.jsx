import { useCallback, useEffect, useState } from 'react';
import CertificateCard from '../utils/CertificateCard';
import axios from '../../axios/axios';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import Title from '../utils/Title';
import Reveal from '../utils/Reveal';

const StaticCertificate = ({ certificate }) => {
  return (
    <div>
      <CertificateCard
        certificate={certificate}
        certificateName={certificate.title}
        organization={certificate.organization}
        credentialUrl={certificate.credentialURL}
      />
    </div>
  );
};

const Certificate = () => {
  const { toast } = useToast();
  const showToast = useCallback(toast, []);
  const navigate = useNavigate();

  const [certificates, setCertificates] = useState([]);
  const [totalCount, setTotalCount] = useState([]);

  const getCertificateDetails = useCallback(async () => {
    try {
      const response = await axios.get('/certificate/get-certificates?size=4');
      const data = response.data.data.certifications;
      const total = response.data.data.total;
      setTotalCount(total);
      setCertificates(data);
      showToast(`${response.data.message}`);
    } catch (error) {
      const response = error?.response;
      const data = response?.data;
      showToast(`${data?.message || 'Failed to load certificates'}`, 'error');
    }
  }, [showToast]);

  useEffect(() => {
    getCertificateDetails();
  }, [getCertificateDetails]);

  return (
    <section
      id="certification"
      className="sm-col-span-4 scroll-mt-26 pb-20 sm:col-start-1 sm:col-end-5"
    >
      <Title text="Certifications and Achievements" />

      <div className="xs:gap-6 lg:gap-12 xs:flex xs:flex-col sm:col-span-2 sm:grid sm:grid-cols-2">
        {certificates.length > 0 &&
          certificates.map((cert, index) => (
            <Reveal delay={index * 0.1} key={cert._id}>
              <StaticCertificate certificate={cert} />
            </Reveal>
          ))}

        {totalCount > 3 && (
          <Reveal>
            <span className="cursor-pointer" onClick={() => navigate('certificates')}>
              Show more
            </span>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default Certificate;
