import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LinkItem = React.memo(({ link, onNavigate }) => {
  if (link.to.startsWith("#")) {
    return (
      <a
        href={link.to}
        onClick={(e) => onNavigate(e, link.to)}
        className="navLink"
      >
        {link.name}
      </a>
    );
  }

  return (
    <NavLink
      to={link.to}
      className={({ isActive }) =>
        isActive ? "xs:text-sky-500 dark:text-sky-300" : "navLink"
      }
    >
      {link.name}
    </NavLink>
  );
});


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
        <div className="flex flex-col gap-y-10 lg:flex-row lg:gap-5 font-primary md:text-xl xs:text-base font-bold w-full">
            {links.map((link) => (
                <LinkItem key={link.to} link={link} onNavigate={handleNavigation} />
            ))}
        </div>
    );
});

export default NavLinks;