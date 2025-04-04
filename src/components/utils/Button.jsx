import React from 'react';
import clsx from 'clsx';

const Button = ({ variant, className = "", children, ...buttonProps }) => {
  const baseStyles = "button";
  
  const variantStyles = {
    primary: "bg-sky-600 text-white",
    secondary: "bg-white text-black dark:bg-black dark:text-white",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 text-gray-500 hover:bg-gray-200",
  };

  return (
    <button
      className={clsx(className, baseStyles, variantStyles[variant], )}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
