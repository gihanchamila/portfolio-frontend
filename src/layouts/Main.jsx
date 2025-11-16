import GridContainer from '../components/GridContainer';
import { Outlet } from 'react-router-dom';

const Main = ({ children }) => {
  return (
    <GridContainer>
      <main className="h-full sm:col-span-4 sm:col-start-1 sm:col-end-5 lg:col-start-2 lg:col-end-12">
        {children || <Outlet />}
      </main>
    </GridContainer>
  );
};

export default Main;
