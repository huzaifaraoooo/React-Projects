import { FiSearch } from "react-icons/fi";
import "./SearchBar.css";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <FiSearch className="search-icon" />

        <input
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search watches, brands, categories..."
        />
      </div>
    </div>
  );
}

export default SearchBar;