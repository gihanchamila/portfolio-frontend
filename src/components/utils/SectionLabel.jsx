import React from "react";

const SectionLabel = ({ icon, label, className = "" }) => {
    return (
        <div
            className={`
                inline-flex items-center gap-2 px-4 py-1 rounded-full 
                text-sm font-semibold tracking-wide uppercase 
                bg-gradient-to-r from-purple-500 to-indigo-500 
                text-white dark:from-purple-400 dark:to-indigo-400
                shadow-md
                xs:text-xs sm:text-sm md:text-base 
                ${className}
            `}
        >
            <span className="w-4 h-4">{icon}</span>
            <span>{label}</span>
        </div>
    );
};

export default SectionLabel;
