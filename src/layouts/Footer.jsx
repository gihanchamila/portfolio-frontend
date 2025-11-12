import GridContainer from "../components/GridContainer";

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
    hidden: { opacity: 0, y: 20, scale: 1 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6,  ease: "easeInOut" } },
  };

  return (
    <GridContainer>
      <motion.footer
        className="text-gray-800 dark:text-gray-50 font-primary lg:col-start-2 lg:col-end-12 col-span-4 relative flex flex-col items-center py-4"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true}}
      >
        <motion.h2 className="sm:text-lg xs:text-base font-semibold" variants={childVariant}>
          Gihan Chamila
        </motion.h2>
        <motion.p className="xs:text-xs" variants={childVariant}>
          algihanchamila@gmail.com
        </motion.p>
        <SocialLinks variant={childVariant} />
      </motion.footer>
    </GridContainer>
  );
};

export default Footer;
