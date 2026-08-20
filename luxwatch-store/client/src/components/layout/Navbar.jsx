import { NavLink } from "react-router-dom";
import { FiHeart, FiShoppingBag } from "react-icons/fi";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

import "./Navbar.css";

const navLinks = [
  { id: 1, label: "Home", path: "/" },
  { id: 2, label: "Shop", path: "/shop" },
  { id: 3, label: "About", path: "/about" },
  { id: 4, label: "Contact", path: "/contact" },
];

function Navbar() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <header className="site-header">
      <nav className="navbar container">
        <NavLink to="/" className="brand-logo">
          Lux<span>Watch</span>
        </NavLink>

        <ul className="nav-menu">
          {navLinks.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <NavLink to="/wishlist" className="navbar-cart">
            <FiHeart />
            <span>Wishlist</span>

            {wishlistCount > 0 && (
              <strong className="navbar-cart-badge">{wishlistCount}</strong>
            )}
          </NavLink>

          <NavLink to="/cart" className="navbar-cart">
            <FiShoppingBag />
            <span>Cart</span>

            {cartCount > 0 && (
              <strong className="navbar-cart-badge">{cartCount}</strong>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;