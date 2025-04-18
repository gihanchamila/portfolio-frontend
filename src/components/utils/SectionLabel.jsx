import React from "react";

const SectionLabel = ({ icon, label, className = "" }) => {
    return (
        <div
            className={`
                relative inline-flex items-center gap-1 md:px-3 md:py-2 xs:p-2 rounded-lg
                font-semibold tracking-wide 
                text-white dark:text-white
                bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%
                overflow-hidden
                xs:text-xs mb-2
                ${className}
            `}
        >
            <span className="">{icon}</span>
            <span>{label}</span>
        </div>
    );
};

export default SectionLabel;
