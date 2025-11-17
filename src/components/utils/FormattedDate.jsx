import React from 'react';

const FormattedDate = ({ date, format = 'long' }) => {
  const d = new Date(date);

  const formats = {
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    },

    short: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    },

    time: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    },

    longWithTime: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
  };
  return <span>{d.toLocaleString('en-US', formats[format] || formats.long)}</span>;
};

export default FormattedDate;
