import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <main className="container cart-page">
      <div className="cart-header">
        <span>Shopping Cart</span>
        <h1>Your Selected Watches</h1>
        <p>Review your luxury timepieces before checkout.</p>
      </div>

      <div className="cart-layout">
        <section className="cart-items">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </section>

        <CartSummary />
      </div>
    </main>
  );
}

export default Cart;