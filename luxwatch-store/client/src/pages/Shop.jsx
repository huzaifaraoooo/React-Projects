import FilterSidebar from "../components/product/filters/FilterSidebar";
import ProductGrid from "../components/product/grid/ProductGrid";
import SearchBar from "../components/product/search/SearchBar";
import SortDropdown from "../components/product/sort/SortDropdown";
import { useProducts } from "../hooks/useProducts";
import "./Shop.css";

function Shop() {
  const {
    products,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    filters,
    toggleCategory,
    toggleBrand,
    updateMaxPrice,
  } = useProducts();

  return (
    <main className="container shop-page">
      <div className="shop-toolbar">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      <div className="shop-layout">
        <FilterSidebar
          filters={filters}
          onCategoryChange={toggleCategory}
          onBrandChange={toggleBrand}
          onPriceChange={updateMaxPrice}
        />

        <ProductGrid products={products} />
      </div>
    </main>
  );
}

export default Shop;