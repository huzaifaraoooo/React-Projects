import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <article className="cart-item">
      <img src={item.imageUrl} alt={item.name} />

      <div className="cart-item-info">
        <span>{item.brand}</span>
        <h3>{item.name}</h3>
        <p>₨ {Number(item.price).toLocaleString()}</p>
      </div>

      <div className="cart-quantity">
        <button type="button" onClick={() => decreaseQuantity(item.id)}>
          <FiMinus />
        </button>

        <strong>{item.quantity}</strong>

        <button type="button" onClick={() => increaseQuantity(item.id)}>
          <FiPlus />
        </button>
      </div>

      <strong className="cart-subtotal">
  ₨ {(item.price * item.quantity).toLocaleString()}
</strong>

      <button
        className="cart-remove"
        type="button"
        onClick={() => removeFromCart(item.id)}
      >
        <FiTrash2 />
      </button>
    </article>
  );
}

export default CartItem;