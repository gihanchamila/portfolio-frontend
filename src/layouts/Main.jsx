import GridContainer from '../components/GridContainer';
import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <GridContainer className="flex-grow">
      <main className="flex-grow sm:col-span-4 sm:col-start-1 sm:col-end-5 lg:col-start-2 lg:col-end-12">
        <Outlet />
      </main>
    </GridContainer>
  );
};

export default Main;
