import { NavLink } from "react-router-dom";
import GridContainer from "../components/GridContainer"

const NavLinkComponent = () => {
    const navLinks = [
        { name: "Home", to: "/" },
        { name: "Featured Projects", to: "/projects" },
        { name: "Certification", to: "/certification" },
        { name: "Contact me", to: "/contact" },
    ];

    return (
        <>
            {navLinks.map((link) => (
                <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                        isActive ? "text-blue-500" : "text-gray-700 hover:text-blue-500"
                    }
                >
                    {link.name}
                </NavLink>
            ))}
        </>
    );
};

const Header = () => {

    return (
        <GridContainer>
            <header className="sm:col-start-1 sm:col-end-4 col-span-4 lg:col-start-2 lg:col-end-12 lg:col-span-10">
                <NavLinkComponent />
            </header>
        </GridContainer>
    );
  };
  
  export default Header;
  