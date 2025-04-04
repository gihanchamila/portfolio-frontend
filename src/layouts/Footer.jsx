import GridContainer from "../components/GridContainer";
import { Github, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
    const socialLinks = [
        { icon: <Github />, to: "https://github.com/gihanchamila" },
        { icon: <Linkedin />, to: "https://www.linkedin.com/in/algihanchamila" },
        { icon: <Instagram />, to: "https://www.instagram.com/zander_xz" },
    ];

    return (
        <GridContainer>
            <footer className="text-gray-800 dark:text-gray-50 font-primary lg:col-start-2 lg:col-end-12 col-span-4 relative flex flex-col items-center py-4">
                <h2 className="text-lg font-semibold">Gihan Chamila</h2>
                <p className="text-sm">algihanchamila@gmail.com</p>
                <div className="flex gap-4 mt-2">
                    {socialLinks.map((link, index) => (
                        <a key={index} href={link.to} role="link" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition">
                            {link.icon}
                        </a>
                    ))}
                </div>
            </footer>
        </GridContainer>
    );
};

export default Footer;
