import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { div } from 'motion/react-client';

const CertificateCard = ({ certificateName, organization, credentialUrl }) => {

  return (
  
     <div className=' border hover:bg-gray-50 transition-all duration-100 border-gray-300 rounded-xl lg:p-10 sm:p-4 lg:h-[250px] sm:h-[200px] flex flex-col justify-between'>
      <div>
        <h2 className='lg:text-2xl sm:text-base font-semibold text-gray-800 drop-shadow-[0_0_10px_rgba(255,255,255,0.5] font-primary'>{certificateName}</h2>
        <p className='text-gray-800 font-base pt-2 line-clamp-2 font-primary'>{organization}</p>
      </div>
      <div className='inline-block'>
        {credentialUrl && (
          <Link
            to={credentialUrl} className='w-fit'
          >
            <Button variant='primary' className='sm:px-1 sm:py' >Show Credentials</Button>
          </Link>
        )}
      </div>
      
    </div>
  );
};

export default CertificateCard;
