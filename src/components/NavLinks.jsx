import React from "react";
import { NavLink } from "react-router-dom";

const NavLinks = React.memo(({ links }) => {
    return (
        <div className="flex flex-col gap-y-10 lg:flex-row lg:gap-5 font-primary text-xl font-bold w-full">
            {links.map((link) => (
                <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                        isActive ? "lg:text-sky-500" : "lg:text-gray-700 hover:text-gray-800"
                    }
                >
                    {link.name}
                </NavLink>
            ))}
        </div>
    );
});

export default NavLinks;