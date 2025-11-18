import GridContainer from '../components/GridContainer';
import DesktopMenu from '../components/DesktopMenu';
import MobileMenu from '../components/MobileMenu';
import useHeaderScroll from '../hooks/useHeaderScroll';

const NAV_LINKS = [
  { name: 'Home', to: '/' },
  { name: 'Featured Projects', to: '#projects' },
  { name: 'Education', to: '#education' },
  { name: 'Certification', to: '#certification' },
  { name: 'Contact me', to: '#contact' }
];

const Header = () => {
  const isShrunk = useHeaderScroll();

  return (
    <div
      className={`
        sticky top-0 left-0 w-full z-50
        dark:bg-surface
        bg-white
        xs:pb-0 
        ${isShrunk ? '' : ' bg-surface xs:pt-0'}
      `}
    >
      <div className="sm:col-span-4 sm:col-start-1 sm:col-end-5 sm:grid sm:grid-cols-4 lg:col-start-2 lg:col-end-13 lg:grid-cols-12">
        <DesktopMenu navLinks={NAV_LINKS} isShrunk={isShrunk} />
        <MobileMenu navLinks={NAV_LINKS} />
      </div>
    </div>
  );
};

export default Header;
