import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Footer = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <footer className={`py-4 mt-auto ${isDark ? "bg-dark text-white" : "bg-light text-dark"}`}>
      <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} ShopPlace. All rights reserved.</p>
        <p className="small mb-0">Built with ❤️ using React & Bootstrap</p>
      </div>
    </footer>
  );
};

export default Footer;
