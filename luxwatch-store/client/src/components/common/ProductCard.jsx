import { Link } from "react-router-dom";
import { FiEye, FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";
import toast from "react-hot-toast";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);
  const stock = Number(product.stock || 0);
  const isOutOfStock = stock <= 0;

  const discountPercentage = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error(`${product.name} is out of stock`);
      return;
    }

    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    toast.success(
      isWishlisted
        ? `${product.name} removed from wishlist`
        : `${product.name} added to wishlist`
    );
  };

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <span className="product-badge">{discountPercentage}% OFF</span>

        {isOutOfStock && <span className="stock-badge out">Out of Stock</span>}
        {!isOutOfStock && stock <= 10 && (
          <span className="stock-badge low">Only {stock} left</span>
        )}

        <div className="product-actions">
          <button
            type="button"
            aria-label="Add to wishlist"
            className={isWishlisted ? "wishlist-active" : ""}
            onClick={handleWishlist}
          >
            <FiHeart />
          </button>

          <Link to={`/products/${product.id}`} aria-label={`View ${product.name}`}>
            <FiEye />
          </Link>
        </div>

        <Link to={`/products/${product.id}`}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
        </Link>
      </div>

      <div className="product-content">
        <div className="product-meta">
          <span>{product.brand}</span>
          <span>{product.category}</span>
        </div>

        <Link to={`/products/${product.id}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>

        <div className="product-rating">
          <FiStar />
          <span>{product.rating}</span>
          <small>({product.reviews || 0} Reviews)</small>
        </div>

        <div className="product-footer">
          <div className="product-price">
            <strong>₨ {Number(product.price).toLocaleString()}</strong>
            <del>₨ {Number(product.oldPrice).toLocaleString()}</del>
          </div>

          <button
            className="cart-btn"
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            <FiShoppingBag />
            {isOutOfStock ? "Out of Stock" : "Add To Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;