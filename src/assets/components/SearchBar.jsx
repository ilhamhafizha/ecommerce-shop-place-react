import { FaSearch } from "react-icons/fa";

const SearchBar = () => (
  <div className="position-relative">
    <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
    <input type="text" className="form-control ps-5" placeholder="Cari di ShopPlace" style={{ width: "300px" }} />
  </div>
);

export default SearchBar;
