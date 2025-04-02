import React from 'react';

const CertificateCard = ({ certificateName, organization, credentialUrl }) => {
  return (
    <div className='bg-sky-500 rounded-xl lg:p-10 sm:p-4 lg:h-[250px] sm:h-[200px]'>
      <h2 className='text-xl font-bold text-white'>{certificateName}</h2>
      <p className='text-white opacity-80'>{organization}</p>
      {credentialUrl && (
        <a
          href={credentialUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='mt-3 inline-block bg-white text-sky-500 px-4 py-2 rounded-lg font-medium transition hover:bg-gray-200'
        >
          Show Credentials
        </a>
      )}
    </div>
  );
};

export default CertificateCard;
