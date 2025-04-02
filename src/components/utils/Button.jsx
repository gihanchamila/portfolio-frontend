import React from 'react';
import clsx from 'clsx';

const Button = ({ variant = "primary", className = "", children, ...buttonProps }) => {
  const baseStyles = "button";
  
  const variantStyles = {
    primary: "bg-sky-500 text-white",
    secondary: "bg-white text-black",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-500 text-gray-500 hover:bg-gray-100",
  };

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
