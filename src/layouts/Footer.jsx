import GridContainer from "../components/GridContainer";
import { Github, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion"; // corrected here too
import SocialLinks from "../components/utils/SocialLinks";

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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const socialLinks = [
    {
      icon: <Github className="footerIconSize" />,
      to: "https://github.com/gihanchamila",
    },
    {
      icon: <Linkedin className="footerIconSize" />,
      to: "https://www.linkedin.com/in/algihanchamila",
    },
    {
      icon: <Instagram className="footerIconSize" />,
      to: "https://www.instagram.com/zander_xz",
    },
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
        <motion.h2 className="sm:text-lg xs:text-base font-semibold" variants={childVariant}>
          Gihan Chamila
        </motion.h2>
        <motion.p className="xs:text-xs" variants={childVariant}>
          algihanchamila@gmail.com
        </motion.p>
        <SocialLinks links={socialLinks} variant={childVariant} />
      </motion.footer>
    </GridContainer>
  );
};

export default Footer;
