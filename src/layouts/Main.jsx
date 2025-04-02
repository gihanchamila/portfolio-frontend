import GridContainer from "../components/GridContainer";
import { Outlet } from "react-router-dom";

const Main = ({ children}) => {
  return (
    <GridContainer>
      <main className="sm:col-start-1 sm:col-end-5 col-span-4 lg:col-start-2 lg:col-end-12 h-full">
       {children || <Outlet />}
      </main>
    </GridContainer>
  );
};

export default Main;
