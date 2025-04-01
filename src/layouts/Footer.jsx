import GridContainer from "../components/GridContainer";
const Footer = () => {
    return (
    <GridContainer>
        <footer className="bg-gray-800 text-white lg:col-start-2 lg:col-end-12 col-span-4 relative">
            &copy; {new Date().getFullYear()} MyApp. All Rights Reserved.
        </footer>
    </GridContainer>
      
    );
  };
  
  export default Footer;
  