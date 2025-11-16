import GridContainer from '../components/GridContainer';
import SocialLinks from '../components/utils/SocialLinks';

const Footer = () => {
  return (
    <GridContainer>
      <footer className="font-primary relative col-span-4 flex flex-col items-center py-4 text-gray-800 lg:col-start-2 lg:col-end-12 dark:text-gray-50">
        <h2 className="xs:text-base font-semibold sm:text-lg">Gihan Chamila</h2>
        <p className="xs:text-xs">algihanchamila@gmail.com</p>
        <SocialLinks />
      </footer>
    </GridContainer>
  );
};

export default Footer;
