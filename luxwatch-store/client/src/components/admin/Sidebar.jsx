import { NavLink } from "react-router-dom";
import {
  FiBox,
  FiGrid,
  FiLayers,
  FiSettings,
  FiShoppingCart,
  FiTag,
  FiGift,
} from "react-icons/fi";

function Sidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        Lux<span>Watch</span>
      </div>

      <nav className="admin-nav">
        <NavLink to="/admin" end>
          <FiGrid />
          Dashboard
        </NavLink>

        <NavLink to="/admin/products">
          <FiBox />
          Products
        </NavLink>

        <NavLink to="/admin/categories">
          <FiLayers />
          Categories
        </NavLink>

        <NavLink to="/admin/brands">
          <FiTag />
          Brands
        </NavLink>

        <NavLink to="/admin/coupons">
          <FiGift />
          Coupons
        </NavLink>

        <NavLink to="/admin/orders">
          <FiShoppingCart />
          Orders
        </NavLink>

        <NavLink to="/admin/settings">
          <FiSettings />
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;