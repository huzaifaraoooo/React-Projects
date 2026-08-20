import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../data/products-demo";
import { filterProducts } from "../utils/filterProducts";
import { searchProducts } from "../utils/searchProducts";
import { sortProducts } from "../utils/sortProducts";

export function useProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [allProducts, setAllProducts] = useState(() => getProducts());

  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    maxPrice: 1000000,
  });

  useEffect(() => {
    const refreshProducts = () => {
      setAllProducts(getProducts());
    };

    refreshProducts();

    window.addEventListener("storage", refreshProducts);
    window.addEventListener("focus", refreshProducts);

    return () => {
      window.removeEventListener("storage", refreshProducts);
      window.removeEventListener("focus", refreshProducts);
    };
  }, []);

  const toggleCategory = (category) => {
    setFilters((prev) => {
      const isSelected = prev.categories.includes(category);

      return {
        ...prev,
        categories: isSelected
          ? prev.categories.filter((item) => item !== category)
          : [...prev.categories, category],
      };
    });
  };

  const toggleBrand = (brand) => {
    setFilters((prev) => {
      const isSelected = prev.brands.includes(brand);

      return {
        ...prev,
        brands: isSelected
          ? prev.brands.filter((item) => item !== brand)
          : [...prev.brands, brand],
      };
    });
  };

  const updateMaxPrice = (price) => {
    setFilters((prev) => ({
      ...prev,
      maxPrice: Number(price),
    }));
  };

  const products = useMemo(() => {
    const searchedProducts = searchProducts(allProducts, searchTerm);
    const filteredProducts = filterProducts(searchedProducts, filters);

    return sortProducts(filteredProducts, sortBy);
  }, [allProducts, searchTerm, sortBy, filters]);

  return {
    products,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    filters,
    toggleCategory,
    toggleBrand,
    updateMaxPrice,
  };
}