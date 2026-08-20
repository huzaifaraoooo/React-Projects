import { Link } from "react-router-dom";
import { FiEye, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import "./Wishlist.css";

function Wishlist() {
  const { addToCart } = useCart();
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
    toast.success(`${product.name} moved to cart`);
  };

  if (wishlistItems.length === 0) {
    return (
      <main className="container wishlist-page">
        <section className="wishlist-empty">
          <h1>Your Wishlist is Empty</h1>
          <p>Save your favorite luxury watches here.</p>
          <Link to="/shop">Explore Watches</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="container wishlist-page">
      <div className="wishlist-header">
        <div>
          <span>Wishlist</span>
          <h1>Your Favorite Watches</h1>
          <p>Products you saved for later.</p>
        </div>

        <button type="button" onClick={clearWishlist}>
          Clear Wishlist
        </button>
      </div>

      <div className="wishlist-grid">
        {wishlistItems.map((product) => (
          <article className="wishlist-card" key={product.id}>
            <img src={product.imageUrl} alt={product.name} />

            <div className="wishlist-content">
              <span>{product.brand}</span>
              <h3>{product.name}</h3>
              <strong>₨ {Number(product.price).toLocaleString()}</strong>

              <div className="wishlist-actions">
                <Link to={`/products/${product.id}`}>
                  <FiEye />
                  View
                </Link>

                <button type="button" onClick={() => handleMoveToCart(product)}>
                  <FiShoppingBag />
                  Move To Cart
                </button>

                <button
                  type="button"
                  className="wishlist-remove"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Wishlist;