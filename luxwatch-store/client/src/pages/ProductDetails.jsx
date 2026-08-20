import { useParams } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";
import toast from "react-hot-toast";
import { getProducts } from "../data/products-demo";
import { useCart } from "../context/CartContext";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const products = getProducts();
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <main className="container product-details-page">
        <h1>Product Not Found</h1>
      </main>
    );
  }

  const stock = Number(product.stock || 0);
  const isOutOfStock = stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error(`${product.name} is out of stock`);
      return;
    }

    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <main className="container product-details-page">
      <section className="product-details-layout">
        <div className="product-details-gallery">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-details-main-image"
          />

          <div className="product-thumbnails">
            <img src={product.imageUrl} alt={product.name} />
          </div>
        </div>

        <div className="product-details-info">
          <span className="product-details-brand">{product.brand}</span>

          <h1>{product.name}</h1>

          <div className="product-details-rating">
            <FiStar />
            <strong>{product.rating}</strong>
            <span>({product.reviews || 0} Reviews)</span>
          </div>

          <p className="product-details-description">
            {product.description || "Premium luxury watch added from admin panel."}
          </p>

          <div className="product-details-price">
            <strong>₨ {Number(product.price).toLocaleString()}</strong>

            {product.oldPrice && (
              <del>₨ {Number(product.oldPrice).toLocaleString()}</del>
            )}
          </div>

          <div className="product-stock-status">
            {isOutOfStock ? (
              <span className="stock-out">Out of Stock</span>
            ) : stock <= 10 ? (
              <span className="stock-low">Only {stock} left in stock</span>
            ) : (
              <span className="stock-in">In Stock</span>
            )}
          </div>

          <div className="product-details-meta">
            <p>
              <strong>SKU:</strong> {product.sku || "N/A"}
            </p>

            <p>
              <strong>Category:</strong> {product.category || "N/A"}
            </p>

            <p>
              <strong>Stock:</strong> {stock} Available
            </p>

            <p>
              <strong>Movement:</strong> {product.movement || "N/A"}
            </p>

            <p>
              <strong>Water Resistance:</strong> {product.waterResistance || "N/A"}
            </p>

            <p>
              <strong>Case Material:</strong> {product.caseMaterial || "N/A"}
            </p>

            <p>
              <strong>Strap Material:</strong> {product.strapMaterial || "N/A"}
            </p>

            <p>
              <strong>Warranty:</strong> {product.warranty || "N/A"}
            </p>
          </div>

          <div className="product-details-actions">
            <button
              className="details-cart-btn"
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              <FiShoppingBag />
              {isOutOfStock ? "Out of Stock" : "Add To Cart"}
            </button>

            <button className="details-wishlist-btn" type="button">
              <FiHeart />
              Wishlist
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;