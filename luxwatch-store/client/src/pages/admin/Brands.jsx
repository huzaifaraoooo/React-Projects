import { useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

const BRANDS_STORAGE_KEY = "luxwatch-admin-brands";

const initialBrands = [
  { id: 1, name: "LuxWatch", products: 6 },
  { id: 2, name: "Rolex", products: 0 },
  { id: 3, name: "Omega", products: 0 },
  { id: 4, name: "Fossil", products: 0 },
  { id: 5, name: "Tissot", products: 0 },
];

function Brands() {
  const [brands, setBrands] = useState(() => {
    const savedBrands = localStorage.getItem(BRANDS_STORAGE_KEY);
    return savedBrands ? JSON.parse(savedBrands) : initialBrands;
  });

  const [brandName, setBrandName] = useState("");
  const [editingBrand, setEditingBrand] = useState(null);

  useEffect(() => {
    localStorage.setItem(BRANDS_STORAGE_KEY, JSON.stringify(brands));
  }, [brands]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!brandName.trim()) {
      toast.error("Brand name is required");
      return;
    }

    if (editingBrand) {
      setBrands((prev) =>
        prev.map((brand) =>
          brand.id === editingBrand.id
            ? { ...brand, name: brandName }
            : brand
        )
      );

      toast.success("Brand updated successfully!");
      setEditingBrand(null);
      setBrandName("");
      return;
    }

    const newBrand = {
      id: Date.now(),
      name: brandName,
      products: 0,
    };

    setBrands((prev) => [newBrand, ...prev]);
    toast.success("Brand added successfully!");
    setBrandName("");
  };

  const handleEdit = (brand) => {
    setEditingBrand(brand);
    setBrandName(brand.name);
  };

  const handleDelete = (brandId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this brand?"
    );

    if (!confirmDelete) return;

    setBrands((prev) => prev.filter((brand) => brand.id !== brandId));
    toast.success("Brand deleted successfully!");
  };

  return (
    <div className="admin-categories-page">
      <div className="admin-page-header">
        <div>
          <span className="admin-kicker">Brands</span>
          <h1>Manage Brands</h1>
          <p>Add, edit, and organize your watch brands.</p>
        </div>
      </div>

      <div className="category-layout">
        <form className="category-form-card" onSubmit={handleSubmit}>
          <h2>{editingBrand ? "Edit Brand" : "Add Brand"}</h2>

          <label>
            Brand Name
            <input
              type="text"
              value={brandName}
              onChange={(event) => setBrandName(event.target.value)}
              placeholder="Rolex"
            />
          </label>

          <button className="admin-primary-btn" type="submit">
            <FiPlus />
            {editingBrand ? "Update Brand" : "Add Brand"}
          </button>

          {editingBrand && (
            <button
              className="admin-cancel-btn"
              type="button"
              onClick={() => {
                setEditingBrand(null);
                setBrandName("");
              }}
            >
              Cancel Edit
            </button>
          )}
        </form>

        <div className="admin-table-card">
          <div className="admin-table-header">
            <h2>Brand List</h2>
            <span>{brands.length} brands</span>
          </div>

          <div className="category-table">
            {brands.map((brand) => (
              <div className="category-row" key={brand.id}>
                <div>
                  <strong>{brand.name}</strong>
                  <small>{brand.products} products</small>
                </div>

                <div className="admin-actions">
                  <button type="button" onClick={() => handleEdit(brand)}>
                    <FiEdit2 />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(brand.id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brands;