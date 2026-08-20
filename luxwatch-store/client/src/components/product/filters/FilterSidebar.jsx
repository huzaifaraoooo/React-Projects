import "./FilterSidebar.css";

const defaultCategories = ["Luxury", "Chronograph", "Automatic", "Classic", "Sport"];
const defaultBrands = ["LuxWatch"];

function getStoredNames(key, fallback) {
  const savedItems = localStorage.getItem(key);

  if (!savedItems) return fallback;

  try {
    const parsedItems = JSON.parse(savedItems);
    return parsedItems.map((item) => item.name);
  } catch {
    return fallback;
  }
}

function FilterSidebar({
  filters,
  onCategoryChange,
  onBrandChange,
  onPriceChange,
}) {
  const categories = getStoredNames("luxwatch-admin-categories", defaultCategories);
  const brands = getStoredNames("luxwatch-admin-brands", defaultBrands);

  return (
    <aside className="filter-sidebar">
      <h3 className="filter-title">Filters</h3>

      <div className="filter-group">
        <h4>Category</h4>

        {categories.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              checked={filters.categories.includes(category)}
              onChange={() => onCategoryChange(category)}
            />
            {category}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Brand</h4>

        {brands.map((brand) => (
          <label key={brand}>
            <input
              type="checkbox"
              checked={filters.brands.includes(brand)}
              onChange={() => onBrandChange(brand)}
            />
            {brand}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Price (PKR)</h4>

        <input
          type="range"
          min="100"
          max="1000000"
          value={filters.maxPrice}
          onChange={(event) => onPriceChange(event.target.value)}
        />

        <span>₨ 100 - ₨ {Number(filters.maxPrice).toLocaleString()}</span>
      </div>
    </aside>
  );
}

export default FilterSidebar;