// Header.jsx
import Logo from "./logo";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import AuthButtons from "./AuthButtons";

const Header = () => {
  return (
    <header className="d-flex bg-danger justify-content-between align-items-center px-4 py-2 shadow-sm">
      <div className="d-flex align-items-center gap-3">
        <Logo />
        <SearchBar />
      </div>
      <div className="d-flex align-items-center gap-3">
        <CartIcon />
        <AuthButtons />
      </div>
    </header>
  );
};

export default Header;
