import GridContainer from '../components/GridContainer';

import { motion } from 'framer-motion'; // corrected here too
import SocialLinks from '../components/utils/SocialLinks';

const Footer = () => {
  const containerVariant = {
    hidden: { opacity: 0, y: 20, scale: 1 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeInOut' } }
  };

  return (
    <GridContainer>
      <motion.footer
        className="font-primary relative col-span-4 flex flex-col items-center py-4 text-gray-800 lg:col-start-2 lg:col-end-12 dark:text-gray-50"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="xs:text-base font-semibold sm:text-lg">Gihan Chamila</h2>
        <p className="xs:text-xs">algihanchamila@gmail.com</p>
        <SocialLinks />
      </motion.footer>
    </GridContainer>
  );
};

export default Footer;
