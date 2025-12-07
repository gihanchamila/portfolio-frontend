import { useCallback, useEffect, useState } from 'react';
import CertificateCard from '../utils/CertificateCard';
import axios from '../../axios/axios';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import Title from '../utils/Title';
import Reveal from '../utils/Reveal';

const StaticCertificate = ({ certificate }) => (
  <CertificateCard
    certificate={certificate}
    certificateName={certificate.title}
    organization={certificate.organization}
    credentialUrl={certificate.credentialURL}
  />
);

const Certificate = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [certificates, setCertificates] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [cachedUpdatedAt, setCachedUpdatedAt] = useState(null);

  const LS_CERTS = 'cached_certificates';
  const LS_UPDATED_AT = 'cached_certificates_updatedAt';

  useEffect(() => {
    const cachedCerts = localStorage.getItem(LS_CERTS);
    const cachedUpdate = localStorage.getItem(LS_UPDATED_AT);

    if (cachedCerts) setCertificates(JSON.parse(cachedCerts));
    if (cachedUpdate) setCachedUpdatedAt(Number(cachedUpdate));
  }, []);

  const getCertificateDetails = useCallback(async () => {
    try {
      const res = await axios.get('/certificate/get-certificates?size=4');
      const data = res.data.data.certifications;
      const total = res.data.data.total;

      const latestUpdatedAt = Math.max(...data.map(cert => new Date(cert.updatedAt).getTime()));

      if (cachedUpdatedAt && latestUpdatedAt === cachedUpdatedAt) {
        return;
      }
      setCertificates(data);
      setTotalCount(total);

      localStorage.setItem(LS_CERTS, JSON.stringify(data));
      localStorage.setItem(LS_UPDATED_AT, latestUpdatedAt);

      toast(res.data.message);
    } catch (error) {
      toast(error?.response?.data?.message || 'Failed to load certificates', 'error');
    }
  }, [cachedUpdatedAt, toast]);

  useEffect(() => {
    getCertificateDetails();
  }, [getCertificateDetails]);

  return (
    <section
      id="certification"
      className="sm-col-span-4 scroll-mt-26 pb-20 sm:col-start-1 sm:col-end-5"
    >
      <Title text="Certifications and Achievements" />

      <div className="xs:gap-6 lg:gap-12 xs:flex xs:flex-col sm:grid sm:grid-cols-2">
        {certificates.map((cert, index) => (
          <Reveal delay={index * 0.1} key={cert._id}>
            <StaticCertificate certificate={cert} />
          </Reveal>
        ))}

        {totalCount > 4 && (
          <Reveal>
            <span
              className="cursor-pointer xs:text-sm lg:text-base"
              onClick={() => navigate('certificates')}
            >
              Show more
            </span>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default Certificate;
