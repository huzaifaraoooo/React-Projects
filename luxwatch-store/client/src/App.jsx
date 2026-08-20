import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import NotFound from "./pages/NotFound";

import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Categories from "./pages/admin/Categories";
import Brands from "./pages/admin/Brands";
import Orders from "./pages/admin/Orders";
import Settings from "./pages/admin/Settings";
import Coupons from "./pages/admin/Coupons";

function UserLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* USER ROUTES */}

        <Route
          path="/"
          element={
            <UserLayout>
              <Home />
            </UserLayout>
          }
        />

        <Route
          path="/shop"
          element={
            <UserLayout>
              <Shop />
            </UserLayout>
          }
        />

        <Route
          path="/about"
          element={
            <UserLayout>
              <About />
            </UserLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <UserLayout>
              <Contact />
            </UserLayout>
          }
        />

        <Route
          path="/products/:id"
          element={
            <UserLayout>
              <ProductDetails />
            </UserLayout>
          }
        />

        <Route
          path="/cart"
          element={
            <UserLayout>
              <Cart />
            </UserLayout>
          }
        />

        {/* NEW WISHLIST PAGE */}

        <Route
          path="/wishlist"
          element={
            <UserLayout>
              <Wishlist />
            </UserLayout>
          }
        />

        <Route
          path="/checkout"
          element={
            <UserLayout>
              <Checkout />
            </UserLayout>
          }
        />

        <Route
          path="/order-success"
          element={
            <UserLayout>
              <OrderSuccess />
            </UserLayout>
          }
        />

        {/* ADMIN */}

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="brands" element={<Brands />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<Settings />} />
          <Route path="coupons" element={<Coupons />} />
        </Route>

        {/* 404 */}

        <Route
          path="*"
          element={
            <UserLayout>
              <NotFound />
            </UserLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;