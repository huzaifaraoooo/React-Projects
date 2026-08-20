import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { getSettings } from "../utils/getSettings";
import { getProducts } from "../data/products-demo";
import "./Checkout.css";

const ORDERS_STORAGE_KEY = "luxwatch-orders";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();

  const settings = getSettings();

  const appliedCoupon = JSON.parse(
    localStorage.getItem("luxwatch-applied-coupon")
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });

  const shippingFee =
    cartTotal >= Number(settings.freeShippingLimit)
      ? 0
      : Number(settings.shippingFee);

  const discount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? Math.round((cartTotal * Number(appliedCoupon.value)) / 100)
      : Number(appliedCoupon.value)
    : 0;

  const grandTotal = Math.max(cartTotal + shippingFee - discount, 0);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateProductStock = () => {
    const products = getProducts();

    const updatedProducts = products.map((product) => {
      const cartProduct = cartItems.find((item) => item.id === product.id);

      if (!cartProduct) return product;

      return {
        ...product,
        stock: Math.max(
          Number(product.stock) - Number(cartProduct.quantity),
          0
        ),
      };
    });

    localStorage.setItem(
      "luxwatch-admin-products",
      JSON.stringify(updatedProducts)
    );
  };

  const saveOrder = () => {
    const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
    const existingOrders = savedOrders ? JSON.parse(savedOrders) : [];

    const newOrder = {
      id: `ORD-${Date.now()}`,
      customer: formData.fullName,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city}`,
      product:
        cartItems.length === 1
          ? cartItems[0].name
          : `${cartItems.length} Products`,
      quantity: cartItems.reduce((total, item) => total + item.quantity, 0),
      amount: grandTotal,
      status: "Pending",
      date: new Date().toISOString().slice(0, 10),
      paymentMethod: formData.paymentMethod,
      items: cartItems,
      subtotal: cartTotal,
      shippingFee,
      discount,
      couponCode: appliedCoupon?.code || "",
    };

    localStorage.setItem(
      ORDERS_STORAGE_KEY,
      JSON.stringify([newOrder, ...existingOrders])
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const products = getProducts();

    const outOfStockItem = cartItems.find((cartItem) => {
      const product = products.find((item) => item.id === cartItem.id);
      return !product || Number(product.stock) < Number(cartItem.quantity);
    });

    if (outOfStockItem) {
      toast.error(`${outOfStockItem.name} does not have enough stock`);
      return;
    }

    updateProductStock();
    saveOrder();

    toast.success("Order placed successfully!");

    localStorage.removeItem("luxwatch-applied-coupon");
    clearCart();
    navigate("/order-success");
  };

  return (
    <main className="container checkout-page">
      <div className="checkout-header">
        <span>Checkout</span>

        <h1>Complete Your Order</h1>

        <p>Enter your details and confirm your luxury watch order.</p>
      </div>

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <section className="checkout-form-card">
          <h2>Customer Information</h2>

          <div className="checkout-grid">
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />

            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
            />

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Complete Address"
              required
            />
          </div>

          <h2>Payment Method</h2>

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option>Cash on Delivery</option>
            <option>Bank Transfer</option>
            <option>JazzCash</option>
            <option>Easypaisa</option>
          </select>

          <button type="submit">Place Order</button>
        </section>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div className="checkout-item" key={item.id}>
              <span>
                {item.name} × {item.quantity}
              </span>

              <strong>
                {settings.currency}{" "}
                {(item.price * item.quantity).toLocaleString()}
              </strong>
            </div>
          ))}

          <div className="checkout-row">
            <span>Subtotal</span>

            <strong>
              {settings.currency} {cartTotal.toLocaleString()}
            </strong>
          </div>

          {discount > 0 && (
            <div className="checkout-row">
              <span>Discount</span>

              <strong style={{ color: "#22c55e" }}>
                - {settings.currency} {discount.toLocaleString()}
              </strong>
            </div>
          )}

          <div className="checkout-row">
            <span>Shipping</span>

            <strong>
              {shippingFee === 0
                ? "Free"
                : `${settings.currency} ${shippingFee.toLocaleString()}`}
            </strong>
          </div>

          <div className="checkout-total">
            <span>Total</span>

            <strong>
              {settings.currency} {grandTotal.toLocaleString()}
            </strong>
          </div>
        </aside>
      </form>
    </main>
  );
}

export default Checkout;