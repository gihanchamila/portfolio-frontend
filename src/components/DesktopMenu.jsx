import GridContainer from './GridContainer';
import NavLinks from './NavLinks';
import ResumeDownload from './utils/ResumeDownload';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';
import ThemeToggle from './utils/ThemeToggle';
import Button from './utils/Button';
const DesktopMenu = ({ navLinks }) => {
  const { admin, signOut } = useAuth();
  return (
    <GridContainer>
      <header
        className={`col-span-4 mt-13 mb-12 hidden rounded-lg py-5 sm:col-start-1 sm:col-end-4 lg:col-span-10 lg:col-start-2 lg:col-end-12 lg:grid`}
      >
        <div className="lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-5">
          <NavLinks links={navLinks} />
          <ThemeToggle />
          <ResumeDownload />
          {admin && (
            <div className="hidden lg:flex lg:gap-5">
              <span
                variant="primary"
                className="rounded-lg bg-neutral-800 p-3"
                size="small"
                onClick={() => signOut()}
              >
                <Button className="flex items-center gap-2 whitespace-nowrap">
                  Log Out
                  <LogOut size={16} />
                </Button>
              </span>
            </div>
          )}
        </div>
      </header>
    </GridContainer>
  );
};

export default DesktopMenu;
