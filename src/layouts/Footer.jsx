import GridContainer from "../components/GridContainer";
import { Github, Linkedin, Instagram } from "lucide-react";
import { motion } from "motion/react";

const Footer = () => {
    const containerVariant = {
        hidden: {},
        visible: {
            transition: {
            staggerChildren: 0.2,
            },
        },
    };

    const childVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const socialLinks = [
        { icon: <Github className="footerIconSize" />, to: "https://github.com/gihanchamila" },
        { icon: <Linkedin className="footerIconSize" />, to: "https://www.linkedin.com/in/algihanchamila" },
        { icon: <Instagram className="footerIconSize" />, to: "https://www.instagram.com/zander_xz" },
    ];

    return (
        <GridContainer>
            <motion.footer 
                className="text-gray-800 dark:text-gray-50 font-primary lg:col-start-2 lg:col-end-12 col-span-4 relative flex flex-col items-center py-4"
                variants={containerVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                >
                <motion.h2 className="sm:text-lg xs:text-base font-semibold" variants={childVariant}>Gihan Chamila</motion.h2>
                <motion.p className="xs:text-xs" variants={childVariant}>algihanchamila@gmail.com</motion.p>
                <motion.div className="flex gap-4 mt-2" variants={childVariant}>
                    {socialLinks.map((link, index) => (
                        <a 
                            key={index} 
                            href={link.to} 
                            role="link" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="hover:text-gray-500 transition"
                        >
                            {link.icon}
                        </a>
                    ))}
                </motion.div>
            </motion.footer>
        </GridContainer>
    );
};

export default Footer;
