import React from 'react';
import clsx from 'clsx';

const Button = ({ variant = "primary", className = "", disabled = false, children, ...buttonProps }) => {
  const baseStyles = "button";

  const variantStyles = {
    primary: "bg-sky-600 text-white hover:bg-sky-700",
    secondary: "bg-white text-black dark:bg-black dark:text-white hover:opacity-80",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  const disabledStyles = "bg-gray-100 text-gray-500";

  return (
    <button
      className={clsx(
        baseStyles,
        disabled ? disabledStyles : variantStyles[variant],
        className
      )}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
