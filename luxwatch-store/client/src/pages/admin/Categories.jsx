import { useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

const CATEGORIES_STORAGE_KEY = "luxwatch-admin-categories";

const initialCategories = [
  { id: 1, name: "Luxury", products: 2 },
  { id: 2, name: "Chronograph", products: 1 },
  { id: 3, name: "Automatic", products: 1 },
  { id: 4, name: "Classic", products: 1 },
  { id: 5, name: "Sport", products: 1 },
];

function Categories() {
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem(CATEGORIES_STORAGE_KEY);

    if (savedCategories) {
      return JSON.parse(savedCategories);
    }

    return initialCategories;
  });

  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanName = categoryName.trim();

    if (!cleanName) {
      toast.error("Category name is required");
      return;
    }

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === editingCategory.id
            ? { ...category, name: cleanName }
            : category
        )
      );

      toast.success("Category updated successfully!");
      setEditingCategory(null);
      setCategoryName("");
      return;
    }

    const newCategory = {
      id: Date.now(),
      name: cleanName,
      products: 0,
    };

    setCategories((prev) => [newCategory, ...prev]);
    toast.success("Category added successfully!");
    setCategoryName("");
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
  };

  const handleDelete = (categoryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    setCategories((prev) =>
      prev.filter((category) => category.id !== categoryId)
    );

    toast.success("Category deleted successfully!");
  };

  return (
    <div className="admin-categories-page">
      <div className="admin-page-header">
        <div>
          <span className="admin-kicker">Categories</span>
          <h1>Manage Categories</h1>
          <p>Add, edit, and organize your watch categories.</p>
        </div>
      </div>

      <div className="category-layout">
        <form className="category-form-card" onSubmit={handleSubmit}>
          <h2>{editingCategory ? "Edit Category" : "Add Category"}</h2>

          <label>
            Category Name
            <input
              type="text"
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
              placeholder="Luxury"
            />
          </label>

          <button className="admin-primary-btn" type="submit">
            <FiPlus />
            {editingCategory ? "Update Category" : "Add Category"}
          </button>

          {editingCategory && (
            <button
              className="admin-cancel-btn"
              type="button"
              onClick={() => {
                setEditingCategory(null);
                setCategoryName("");
              }}
            >
              Cancel Edit
            </button>
          )}
        </form>

        <div className="admin-table-card">
          <div className="admin-table-header">
            <h2>Category List</h2>
            <span>{categories.length} categories</span>
          </div>

          <div className="category-table">
            {categories.map((category) => (
              <div className="category-row" key={category.id}>
                <div>
                  <strong>{category.name}</strong>
                  <small>{category.products} products</small>
                </div>

                <div className="admin-actions">
                  <button type="button" onClick={() => handleEdit(category)}>
                    <FiEdit2 />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(category.id)}
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

export default Categories;