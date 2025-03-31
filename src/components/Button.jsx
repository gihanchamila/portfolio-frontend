import React from 'react';
import clsx from 'clsx';

const Button = ({ variant = 'default', className = '', children, onClick, disabled }) => {
    const baseClass = 'btn';
    const variantClass = {
        outline: 'btn-outline',
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        error: 'btn-error',
        default: '',
    };

    return (
        <button
            className={clsx(baseClass, variantClass[variant], className)}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;