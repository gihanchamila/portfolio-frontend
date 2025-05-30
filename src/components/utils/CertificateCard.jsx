import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { motion } from 'motion/react';

const CertificateCard = ({ certificate, certificateName, organization, credentialUrl }) => {

  return (

     <motion.div className=' border  transition-all duration-100 border-gray-300 dark:border-gray-50 rounded-xl lg:p-10 xs:p-4 lg:h-[250px] sm:h-[200px] flex flex-col justify-between'>
      <div className=''>
        <h2 className='lg:text-2xl sm:text-base xs:text-sm xs:font-semibold text-gray-800 dark:text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5] font-primary'>{certificateName}</h2>
        <p className='text-gray-800 font-base pt-2 line-clamp-2 xs:font-primary dark:text-white'>{organization}</p>
      </div>
      <div className='inline-block xs:mt-2 sm:mt-0'>
        {credentialUrl && (
          <a
            href={credentialUrl} target='_blank' className='inline-block'
          >
            <Button variant='primary' className='xs:px-1 xs:py-1' >Show Credentials</Button>
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default CertificateCard;
