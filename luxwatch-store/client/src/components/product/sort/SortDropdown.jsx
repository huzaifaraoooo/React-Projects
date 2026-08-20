import { FiChevronDown } from "react-icons/fi";
import "./SortDropdown.css";

function SortDropdown({ sortBy, onSortChange }) {
  return (
    <div className="sort-wrapper">
      <label htmlFor="sort">Sort By</label>

      <div className="sort-select">
        <select
          id="sort"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>

        <FiChevronDown className="sort-icon" />
      </div>
    </div>
  );
}

export default SortDropdown;