import { useState } from "react";
import DesktopMenu from "../components/DesktopMenu";
import MobileMenu from "../components/MobileMenu";


const Header = () => {

    const [menuOpen, setMenuOpen] = useState(true)

    const navLinks = [
        { name: "Home", to: "/" },
        { name: "Featured Projects", to: "#projects" },
        { name: "Certification", to: "#certification" },
        { name: "Contact me", to: "#contact" },
    ];

    return (
        <>
            <DesktopMenu navLinks={navLinks} />
            <MobileMenu navLinks={navLinks} />
        </>
        
    );
};

export default Header;