import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import { getSettings } from "../../utils/getSettings";

function CartSummary() {
  const { cartCount, cartTotal } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    const savedCoupon = localStorage.getItem("luxwatch-applied-coupon");
    return savedCoupon ? JSON.parse(savedCoupon) : null;
  });

  const settings = getSettings();

  const shipping =
    cartTotal >= Number(settings.freeShippingLimit)
      ? 0
      : Number(settings.shippingFee);

  const handleApplyCoupon = () => {
    localStorage.removeItem("luxwatch-applied-coupon");
    setAppliedCoupon(null);

    const coupons = JSON.parse(localStorage.getItem("luxwatch-coupons")) || [];

    const coupon = coupons.find(
      (item) => item.code.toUpperCase() === couponCode.trim().toUpperCase()
    );

    if (!coupon) {
      toast.error("Invalid coupon code");
      return;
    }

    if (coupon.status !== "Active") {
      toast.error("Coupon is inactive");
      return;
    }

    if (cartTotal < Number(coupon.minOrder)) {
      toast.error(
        `Minimum order is ${settings.currency} ${Number(
          coupon.minOrder
        ).toLocaleString()}`
      );
      return;
    }

    setAppliedCoupon(coupon);
    localStorage.setItem("luxwatch-applied-coupon", JSON.stringify(coupon));
    toast.success("Coupon applied successfully");
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    localStorage.removeItem("luxwatch-applied-coupon");
    toast.success("Coupon removed");
  };

  const discount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? Math.round((cartTotal * Number(appliedCoupon.value)) / 100)
      : Number(appliedCoupon.value)
    : 0;

  const grandTotal = Math.max(cartTotal + shipping - discount, 0);

  return (
    <aside className="cart-summary">
      <h2>Order Summary</h2>

      <div className="summary-row">
        <span>Total Items</span>
        <strong>{cartCount}</strong>
      </div>

      <div className="summary-row">
        <span>Subtotal</span>
        <strong>
          {settings.currency} {cartTotal.toLocaleString()}
        </strong>
      </div>

      <div className="coupon-box">
        <label>Have a Coupon?</label>

        <div className="coupon-input-row">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
          />

          <button type="button" onClick={handleApplyCoupon}>
            Apply
          </button>
        </div>

        {appliedCoupon && (
          <div className="coupon-applied-row">
            <p className="coupon-success">{appliedCoupon.code} applied</p>

            <button type="button" onClick={handleRemoveCoupon}>
              Remove
            </button>
          </div>
        )}
      </div>

      {discount > 0 && (
        <div className="summary-row discount-row">
          <span>Discount</span>
          <strong>
            - {settings.currency} {discount.toLocaleString()}
          </strong>
        </div>
      )}

      <div className="summary-row">
        <span>Shipping</span>
        <strong>
          {shipping === 0
            ? "Free"
            : `${settings.currency} ${shipping.toLocaleString()}`}
        </strong>
      </div>

      <div className="summary-total">
        <span>Total</span>
        <strong>
          {settings.currency} {grandTotal.toLocaleString()}
        </strong>
      </div>

      <Link to="/checkout" className="checkout-btn">
        Proceed To Checkout
      </Link>
    </aside>
  );
}

export default CartSummary;