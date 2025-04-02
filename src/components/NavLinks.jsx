import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavLinks = React.memo(({ links }) => {
    const navigate = useNavigate();

    const handleNavigation = (e, to) => {
        if (to.startsWith("#")) {
            e.preventDefault();
            const section = document.querySelector(to);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            navigate(to); 
        }
    };
    
    return (
        <div className="flex flex-col gap-y-10 lg:flex-row lg:gap-5 font-primary text-xl font-bold w-full">
            {links.map((link) =>
                link.to.startsWith("#") ? (
                    <a
                        key={link.to}
                        href={link.to}
                        onClick={(e) => handleNavigation(e, link.to)}
                        className="lg:text-gray-700 hover:text-gray-800"
                    >
                        {link.name}
                    </a>
                ) : (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            isActive ? "lg:text-sky-500" : "lg:text-gray-700 hover:text-gray-800"
                        }
                    >
                        {link.name}
                    </NavLink>
                )
            )}
        </div>
    );
});

export default NavLinks;