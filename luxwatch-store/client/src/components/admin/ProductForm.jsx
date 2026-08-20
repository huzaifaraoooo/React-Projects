import { useMemo, useState } from "react";

const initialFormState = {
  name: "",
  brand: "",
  category: "",
  price: "",
  oldPrice: "",
  stock: "",
  rating: "",
  movement: "",
  waterResistance: "",
  caseMaterial: "",
  strapMaterial: "",
  warranty: "",
  description: "",
  imageUrl: "",
  imageFile: null,
  isFeatured: false,
};

const defaultBrands = ["LuxWatch", "Rolex", "Omega", "Fossil", "Tissot"];

const defaultCategories = [
  "Luxury",
  "Chronograph",
  "Automatic",
  "Classic",
  "Sport",
];

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

function ProductForm({ onClose, onSave, editingProduct }) {
  const [formData, setFormData] = useState(editingProduct || initialFormState);

  const brandOptions = getStoredNames("luxwatch-admin-brands", defaultBrands);
  const categoryOptions = getStoredNames(
    "luxwatch-admin-categories",
    defaultCategories
  );

  const isEditMode = Boolean(editingProduct);

  const previewImage = useMemo(() => {
    if (formData.imageFile) return URL.createObjectURL(formData.imageFile);
    if (formData.imageUrl) return formData.imageUrl;
    if (editingProduct?.imageUrl) return editingProduct.imageUrl;
    return "";
  }, [formData.imageFile, formData.imageUrl, editingProduct]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (files && files[0]) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imageFile: files[0],
          imageUrl: reader.result,
        }));
      };

      reader.readAsDataURL(files[0]);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const productData = {
      ...formData,
      id: editingProduct?.id || Date.now(),
      slug: formData.name.toLowerCase().replaceAll(" ", "-"),
      sku: editingProduct?.sku || `LW-${Date.now()}`,
      price: Number(formData.price),
      oldPrice: Number(formData.oldPrice),
      stock: Number(formData.stock),
      rating: Number(formData.rating),
      reviews: editingProduct?.reviews || 0,
      isFeatured: Boolean(formData.isFeatured),
      imageUrl:
        formData.imageUrl ||
        editingProduct?.imageUrl ||
        "https://via.placeholder.com/900x600",
      description:
        formData.description ||
        "New luxury watch added from admin panel.",
      movement: formData.movement || "N/A",
      waterResistance: formData.waterResistance || "N/A",
      caseMaterial: formData.caseMaterial || "N/A",
      strapMaterial: formData.strapMaterial || "N/A",
      warranty: formData.warranty || "N/A",
    };

    onSave(productData);
    onClose();
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal">
        <div className="admin-modal-header">
          <h2>{isEditMode ? "Edit Product" : "Add New Product"}</h2>
          <button type="button" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Product Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Brand
              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              >
                <option value="">Select Brand</option>
                {brandOptions.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Category
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Price
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Old Price
              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Stock
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Rating
              <input
                type="number"
                step="0.1"
                max="5"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Movement
              <input
                type="text"
                name="movement"
                value={formData.movement}
                onChange={handleChange}
                placeholder="Quartz Chronograph"
              />
            </label>

            <label>
              Water Resistance
              <input
                type="text"
                name="waterResistance"
                value={formData.waterResistance}
                onChange={handleChange}
                placeholder="100M"
              />
            </label>

            <label>
              Case Material
              <input
                type="text"
                name="caseMaterial"
                value={formData.caseMaterial}
                onChange={handleChange}
                placeholder="Stainless Steel"
              />
            </label>

            <label>
              Strap Material
              <input
                type="text"
                name="strapMaterial"
                value={formData.strapMaterial}
                onChange={handleChange}
                placeholder="Leather"
              />
            </label>

            <label>
              Warranty
              <input
                type="text"
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
                placeholder="2 Years Warranty"
              />
            </label>

            <label>
              Image URL
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </label>

            <label className="full-field">
              Description
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write product description..."
              />
            </label>

            <label className="full-field">
              Upload Image
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleChange}
              />
            </label>

            {previewImage && (
              <div className="image-preview full-field">
                <span>Image Preview</span>
                <img src={previewImage} alt="Product preview" />
              </div>
            )}
          </div>

          <label className="featured-check">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  isFeatured: event.target.checked,
                }))
              }
            />
            Show this product on Home Page
          </label>

          <button className="admin-primary-btn" type="submit">
            {isEditMode ? "Update Product" : "Save Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;