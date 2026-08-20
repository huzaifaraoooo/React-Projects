import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <main className="container cart-page">
      <div className="empty-cart">
        <h1>Your Cart is Empty</h1>
        <p>Add your favorite luxury watches to continue shopping.</p>

        <Link to="/shop">Go To Shop</Link>
      </div>
    </main>
  );
}

export default EmptyCart;