import GridContainer from "../components/GridContainer";
import { Github, Linkedin, Instagram } from "lucide-react";
const Footer = () => {
    return (
    <GridContainer>
        <footer className="text-gray-800 font-primary lg:col-start-2 lg:col-end-12 col-span-4 relative flex flex-col items-center py-4">
            <h2 className="text-lg font-semibold">Gihan Chamila</h2>
            <p className="text-sm text-gray-400">algihanchamila@gmail.com</p>
            <div className="flex gap-4 mt-2">
                <Github className="icon" />
                <Linkedin className="icon" />
                <Instagram className="icon" />
            </div>
        </footer>
    </GridContainer>
      
    );
  };
  
  export default Footer;
  