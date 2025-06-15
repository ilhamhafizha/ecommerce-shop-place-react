import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import logoLight from "../../assets/img/logo.jpg";
import logoDark from "../../assets/img/black-logo.png";
import { FaSearch, FaShoppingCart, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`d-flex flex-wrap ${
        isDark ? "bg-dark" : "bg-danger"
      } justify-content-between align-items-center px-3 py-2 shadow-sm`}
    >
      {/* Kiri: Logo & Search */}
      <div className="d-flex align-items-center gap-3 flex-grow-1 flex-wrap">
        <Link to="/">
          <img src={isDark ? logoDark : logoLight} alt="ShopPlace Logo" height="40" style={{ cursor: "pointer" }} />
        </Link>

        {/* Search bar - hidden on xs, shown from md+ */}
        <div className="position-relative d-none d-md-block flex-grow-1">
          <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
          <input
            type="text"
            className="form-control ps-5"
            placeholder="Cari di ShopPlace"
            style={{ maxWidth: "300px" }}
          />
        </div>
      </div>

      {/* Kanan: Cart & Menu */}
      <div className="d-flex align-items-center gap-3 mt-2 mt-md-0">
        {/* Cart Icon - Always visible */}
        <Link to="/cart">
          <FaShoppingCart className="fs-5 text-white" />
        </Link>

        {/* Desktop Buttons */}
        <div className="d-none d-md-flex align-items-center gap-2">
          <Link
            to="/login"
            className="btn btn-sm btn-light text-dark"
            onClick={() => localStorage.setItem("fromLogin", "true")}
          >
            Masuk
          </Link>
          <Link to="/register" className="btn btn-sm btn-light text-dark">
            Daftar
          </Link>
          <button onClick={toggleTheme} className="btn btn-sm btn-outline-light">
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Hamburger - Mobile only */}
        <div className="d-md-none">
          <button className="btn btn-sm btn-light text-dark" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Dropdown - Mobile only */}
      {menuOpen && (
        <div className="d-md-none w-100 mt-2">
          <div className="d-flex flex-column align-items-start gap-2">
            <Link
              to="/login"
              className="btn btn-sm btn-light text-dark w-100"
              onClick={() => {
                localStorage.setItem("fromLogin", "true");
                setMenuOpen(false);
              }}
            >
              Masuk
            </Link>
            <Link to="/register" className="btn btn-sm btn-light text-dark w-100" onClick={() => setMenuOpen(false)}>
              Daftar
            </Link>
            <button onClick={toggleTheme} className="btn btn-sm btn-outline-light w-100">
              {isDark ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;