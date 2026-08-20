import {
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiDollarSign,
  FiStar,
  FiHeart,
  FiAlertTriangle,
  FiXCircle,
  FiTag,
  FiLayers,
} from "react-icons/fi";

import DashboardCard from "../../components/admin/DashboardCard";
import RecentOrders from "../../components/admin/RecentOrders";
import { getProducts } from "../../data/products-demo";
import { useCart } from "../../context/CartContext";

function getStorageItems(key) {
  const savedItems = localStorage.getItem(key);

  if (!savedItems) return [];

  try {
    return JSON.parse(savedItems);
  } catch {
    return [];
  }
}

function Dashboard() {
  const { cartCount, cartTotal } = useCart();

  const products = getProducts();
  const orders = getStorageItems("luxwatch-orders");
  const categories = getStorageItems("luxwatch-admin-categories");
  const brands = getStorageItems("luxwatch-admin-brands");
  const wishlist = getStorageItems("luxwatch-wishlist");

  const featuredProducts = products.filter(
    (product) => product.isFeatured === true
  );

  const lowStockProducts = products.filter((product) => {
    const stock = Number(product.stock || 0);
    return stock > 0 && stock <= 10;
  });

  const outOfStockProducts = products.filter(
    (product) => Number(product.stock || 0) <= 0
  );

  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.amount || 0),
    0
  );

  const totalCustomers = new Set(
    orders.map((order) => order.phone || order.customer)
  ).size;

  return (
    <div className="dashboard-page">
      <div className="dashboard-grid">
        <DashboardCard
          icon={<FiBox />}
          title="Products"
          value={products.length}
          note="Total active products"
        />

        <DashboardCard
          icon={<FiStar />}
          title="Featured"
          value={featuredProducts.length}
          note="Products shown on home"
        />

        <DashboardCard
          icon={<FiLayers />}
          title="Categories"
          value={categories.length}
          note="Active product categories"
        />

        <DashboardCard
          icon={<FiTag />}
          title="Brands"
          value={brands.length}
          note="Available watch brands"
        />

        <DashboardCard
          icon={<FiShoppingCart />}
          title="Orders"
          value={orders.length}
          note="Total customer orders"
        />

        <DashboardCard
          icon={<FiDollarSign />}
          title="Revenue"
          value={`₨ ${totalRevenue.toLocaleString()}`}
          note="Total order revenue"
        />

        <DashboardCard
          icon={<FiUsers />}
          title="Customers"
          value={totalCustomers}
          note="Unique customers"
        />

        <DashboardCard
          icon={<FiHeart />}
          title="Wishlist"
          value={wishlist.length}
          note="Saved wishlist items"
        />

        <DashboardCard
          icon={<FiShoppingCart />}
          title="Cart Items"
          value={cartCount}
          note="Items currently in cart"
        />

        <DashboardCard
          icon={<FiDollarSign />}
          title="Cart Value"
          value={`₨ ${Number(cartTotal).toLocaleString()}`}
          note="Current cart total"
        />

        <DashboardCard
          icon={<FiAlertTriangle />}
          title="Low Stock"
          value={lowStockProducts.length}
          note="Products with 1-10 stock"
        />

        <DashboardCard
          icon={<FiXCircle />}
          title="Out of Stock"
          value={outOfStockProducts.length}
          note="Products unavailable"
        />
      </div>

      <RecentOrders />
    </div>
  );
}

export default Dashboard;