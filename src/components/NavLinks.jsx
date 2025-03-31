import React from "react";
import { NavLink } from "react-router-dom";

const NavLinks = React.memo(({ links }) => {
    return (
        <div className="lg:flex lg:gap-5 font-primary text-lg font-bold">
            {links.map((link) => (
                <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                        isActive ? "lg:text-sky-300" : "lg:text-white hover:text-surface-dim"
                    }
                >
                    {link.name}
                </NavLink>
            ))}
        </div>
    );
});

export default NavLinks;