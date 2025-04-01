import React from "react";
import { NavLink } from "react-router-dom";

const NavLinks = React.memo(({ links }) => {
    return (
        <div className="lg:flex lg:gap-5 font-primary text-xl font-bold">
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