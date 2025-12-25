import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { motion } from 'motion/react';

const CertificateCard = ({ certificate, certificateName, organization, credentialUrl }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className="xs:p-4 flex flex-col justify-between rounded-xl border dark:border-white/10 transition-all duration-100 sm:h-[200px] lg:h-[250px] lg:p-10 dark:border-gray-700 hover:border-sky-500 active:border-sky-700"
    >
      <div className="">
        <h2
          className="xs:text-sm xs:font-semibold font-primary text-gray-800 drop-shadow-[0_0_10px_rgba(255,255,255,0.5] sm:text-base lg:text-2xl dark:text-white"
          aria-label={certificateName}
        >
          {certificateName}
        </h2>
        <p className="font-base xs:font-primary line-clamp-2 pt-2 text-gray-800 dark:text-white">
          {organization}
        </p>
      </div>
      <div className="xs:mt-2 inline-block sm:mt-0">
        {credentialUrl && (
          <a href={credentialUrl} target="_blank" className="inline-block">
            <Button variant="primary" className="xs:px-1 xs:py-1">
              Show Credentials
            </Button>
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default CertificateCard;
