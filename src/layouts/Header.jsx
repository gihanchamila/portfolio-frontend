import { useState, Profiler, useMemo } from "react";
import DesktopMenu from "../components/DesktopMenu";
import MobileMenu from "../components/MobileMenu";


const Header = () => {

    const navLinks = useMemo(() => [
        { name: "Home", to: "/" },
        { name: "Featured Projects", to: "#projects" },
        { name: "Education", to: "#education" },
        { name: "Certification", to: "#certification" },
        { name: "Contact me", to: "#contact" },
    ], []) ;

    return (
        <>  
            <DesktopMenu navLinks={navLinks} />
            <MobileMenu navLinks={navLinks} />
        </>
        
    );
};

export default Header;