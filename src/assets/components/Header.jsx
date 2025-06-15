// Header.jsx
import logoLight from "../../assets/img/logo.jpg";
import logoDark from "../../assets/img/black-logo.png";
import { FaSearch, FaShoppingCart, FaMoon, FaSun } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <header
      className={`d-flex ${
        isDark ? "bg-dark" : "bg-danger"
      } justify-content-between align-items-center px-4 py-2 shadow-sm`}
    >
      <div className="d-flex align-items-center gap-3">
        {/* Logo */}
        <img src={isDark ? logoDark : logoLight} alt="ShopPlace Logo" height="40" />
        {/* Search Bar */}
        <div className="position-relative">
          <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
          <input type="text" className="form-control ps-5" placeholder="Cari di ShopPlace" style={{ width: "300px" }} />
        </div>
      </div>
      <div className="d-flex align-items-center gap-3">
        {/*CartIcon*/}
        <FaShoppingCart className="fs-5 text-white" />
        {/* AuthButtons */}
        <Link to="/login" className="btn text-white">Masuk</Link>
        <Link to="/register" className="btn text-white">Daftar</Link>
        {/* Theme Toggle Button */}
        <button onClick={toggleTheme} className="btn btn-outline-light">
          {isDark ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
