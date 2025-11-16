import GridContainer from '../components/GridContainer';
import SocialLinks from '../components/utils/SocialLinks';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <GridContainer>
      <footer className="font-primary relative col-span-4 flex flex-col items-center py-4 text-gray-800 lg:col-start-2 lg:col-end-12 dark:text-gray-50">
        <motion.div
          style={{ position: 'relative', willChange: 'transform, opacity' }}
          initial={{ opacity: 0, translateY: 0 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <h2 className="xs:text-base font-semibold sm:text-lg">Gihan Chamila</h2>
          <p className="xs:text-xs">algihanchamila@gmail.com</p>
          <SocialLinks />
        </motion.div>
      </footer>
    </GridContainer>
  );
};

export default Footer;
