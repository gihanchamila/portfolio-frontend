import GridContainer from "../components/GridContainer";
import NavLinks from "../components/NavLinks";
import Button from "../components/utils/Button";
import { NavLink } from "react-router-dom";

const Header = () => {
    const navLinks = [
        { name: "Home", to: "/" },
        { name: "Featured Projects", to: "/projects" },
        { name: "Certification", to: "/certification" },
        { name: "Contact me", to: "/contact" },
    ];

    return (
        <GridContainer>
            <header className="sm:col-start-1 sm:col-end-4 col-span-4 lg:col-start-2 lg:col-end-12 lg:col-span-10 mt-13 mb-12 py-5 rounded-lg">
                <div className="lg:flex lg:justify-between lg:items-center lg:gap-5">
                    <NavLinks links={navLinks} />
                    <Button variant="primary" className="px-4 py-2 font-semibold" aria-label="View Resume">
                        <NavLink to="/resume">Resume</NavLink>
                    </Button>
                </div>
            </header>
        </GridContainer>
    );
};

export default Header;