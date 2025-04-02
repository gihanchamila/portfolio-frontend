import React from 'react';

const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-hidden backdrop-brightness-50 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-10 rounded-lg sm:w-1/3">
        {children}
      </div>
    </div>
  );
};

export default Popup;
