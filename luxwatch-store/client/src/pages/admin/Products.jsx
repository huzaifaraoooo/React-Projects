import { useEffect, useMemo, useState } from "react";
import { FiEdit2, FiPlus, FiSearch, FiTrash2, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import ProductForm from "../../components/admin/ProductForm";
import { featuredProducts } from "../../data/products-demo";

const ADMIN_PRODUCTS_STORAGE_KEY = "luxwatch-admin-products";
const PRODUCTS_PER_PAGE = 5;

function Products() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem(ADMIN_PRODUCTS_STORAGE_KEY);
    return savedProducts ? JSON.parse(savedProducts) : featuredProducts;
  });

  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [adminSearch, setAdminSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    localStorage.setItem(ADMIN_PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    setCurrentPage(1);
  }, [adminSearch, selectedBrand, selectedCategory]);

  const brands = useMemo(
    () => ["all", ...new Set(products.map((product) => product.brand))],
    [products]
  );

  const categories = useMemo(
    () => ["all", ...new Set(products.map((product) => product.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const search = adminSearch.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search) ||
        product.sku.toLowerCase().includes(search) ||
        product.brand.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search);

      const matchesBrand =
        selectedBrand === "all" || product.brand === selectedBrand;

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesBrand && matchesCategory;
    });
  }, [products, adminSearch, selectedBrand, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const clearFilters = () => {
    setAdminSearch("");
    setSelectedBrand("all");
    setSelectedCategory("all");
  };

  const handleOpenAddForm = () => {
    setEditingProduct(null);
    setIsProductFormOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsProductFormOpen(true);
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productData.id ? productData : product
        )
      );

      toast.success("Product updated successfully!");
      return;
    }

    setProducts((prevProducts) => [productData, ...prevProducts]);
    toast.success("Product added successfully!");
  };

  const handleDeleteProduct = (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );

    toast.success("Product deleted successfully!");
  };

  const handleCloseForm = () => {
    setIsProductFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="admin-products-page">
      <div className="admin-page-header">
        <div>
          <span className="admin-kicker">Products</span>
          <h1>Manage Products</h1>
          <p>Add, edit, filter, and manage your luxury watch inventory.</p>
        </div>

        <button
          className="admin-primary-btn"
          type="button"
          onClick={handleOpenAddForm}
        >
          <FiPlus />
          Add Product
        </button>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-header">
          <h2>Product List</h2>
          <span>{filteredProducts.length} products</span>
        </div>

        <div className="admin-products-toolbar">
          <div className="admin-search-box">
            <FiSearch />
            <input
              type="text"
              value={adminSearch}
              onChange={(event) => setAdminSearch(event.target.value)}
              placeholder="Search product, SKU, brand..."
            />
          </div>

          <select
            className="admin-filter-select"
            value={selectedBrand}
            onChange={(event) => setSelectedBrand(event.target.value)}
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand === "all" ? "All Brands" : brand}
              </option>
            ))}
          </select>

          <select
            className="admin-filter-select"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>

          <button className="admin-clear-btn" type="button" onClick={clearFilters}>
            <FiX />
            Clear
          </button>
        </div>

        <div className="admin-product-table">
          <div className="admin-product-row admin-product-row-head">
            <span>Product</span>
            <span>Category</span>
            <span>Price</span>
            <span>Stock</span>
            <span>Rating</span>
            <span>Actions</span>
          </div>

          {paginatedProducts.map((product) => (
            <div className="admin-product-row" key={product.id}>
              <div className="admin-product-info">
                <img src={product.imageUrl} alt={product.name} />

                <div>
                  <strong>{product.name}</strong>
                  <small>{product.sku}</small>
                </div>
              </div>

              <span>{product.category}</span>
              <span>₨ {Number(product.price).toLocaleString()}</span>
              <span>{product.stock}</span>
              <span>{product.rating}</span>

              <div className="admin-actions">
                <button type="button" onClick={() => handleEditProduct(product)}>
                  <FiEdit2 />
                </button>

                <button type="button" onClick={() => handleDeleteProduct(product.id)}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="admin-empty-row">
              No products found. Try changing your filters.
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="admin-pagination">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {isProductFormOpen && (
        <ProductForm
          onClose={handleCloseForm}
          onSave={handleSaveProduct}
          editingProduct={editingProduct}
        />
      )}
    </div>
  );
}

export default Products;