import { Link } from "react-router-dom";
import { FiCheckCircle, FiShoppingBag } from "react-icons/fi";
import "./OrderSuccess.css";

function OrderSuccess() {
  return (
    <main className="order-success-page">
      <section className="order-success-card">
        <div className="success-icon">
          <FiCheckCircle />
        </div>

        <span>Order Confirmed</span>
        <h1>Thank You For Your Order</h1>

        <p>
          Your LuxWatch order has been placed successfully. Our team will contact
          you soon for confirmation.
        </p>

        <div className="success-actions">
          <Link to="/shop">
            <FiShoppingBag />
            Continue Shopping
          </Link>

          <Link to="/">Back To Home</Link>
        </div>
      </section>
    </main>
  );
}

export default OrderSuccess;