import { useEffect, useMemo, useState } from "react";
import { FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

const ORDERS_STORAGE_KEY = "luxwatch-orders";

const initialOrders = [
  {
    id: "ORD-1001",
    customer: "Ali Raza",
    phone: "0300-1234567",
    product: "Royal Chrono Black",
    quantity: 1,
    amount: 45000,
    status: "Pending",
    date: "2026-07-01",
    address: "Gulberg, Lahore",
    paymentMethod: "Cash on Delivery",
  },
  {
    id: "ORD-1002",
    customer: "Huzaifa Akbar",
    phone: "0312-9876543",
    product: "Classic Gold Edition",
    quantity: 1,
    amount: 89000,
    status: "Processing",
    date: "2026-07-02",
    address: "Johar Town, Lahore",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "ORD-1003",
    customer: "Ahmed Khan",
    phone: "0321-5558899",
    product: "Silver Moon Automatic",
    quantity: 2,
    amount: 145000,
    status: "Delivered",
    date: "2026-07-02",
    address: "DHA Phase 5, Lahore",
    paymentMethod: "Cash on Delivery",
  },
];

function Orders() {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
    return savedOrders ? JSON.parse(savedOrders) : initialOrders;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        !search ||
        order.id.toLowerCase().includes(search) ||
        order.customer.toLowerCase().includes(search) ||
        order.phone.includes(search);

      const matchesStatus =
        selectedStatus === "all" || order.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, selectedStatus]);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    toast.success("Order status updated!");
  };

  const handleDeleteOrder = (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );

    toast.success("Order deleted successfully!");
  };

  return (
    <div className="admin-orders-page">
      <div className="admin-page-header">
        <div>
          <span className="admin-kicker">Orders</span>
          <h1>Manage Orders</h1>
          <p>Track customer orders, payment status, and delivery progress.</p>
        </div>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-header">
          <h2>Order List</h2>
          <span>{filteredOrders.length} orders</span>
        </div>

        <div className="orders-toolbar">
          <div className="admin-search-box">
            <FiSearch />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search order ID, customer, phone..."
            />
          </div>

          <select
            className="admin-filter-select"
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="orders-table-admin">
          <div className="order-admin-row order-admin-head">
            <span>Order ID</span>
            <span>Customer</span>
            <span>Product</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Date</span>
            <span>Actions</span>
          </div>

          {filteredOrders.map((order) => (
            <div className="order-admin-row" key={order.id}>
              <strong>{order.id}</strong>

              <div>
                <span>{order.customer}</span>
                <small>{order.phone}</small>
              </div>

              <span>{order.product}</span>

              <strong>₨ {Number(order.amount).toLocaleString()}</strong>

              <select
                className={`order-status ${order.status.toLowerCase()}`}
                value={order.status}
                onChange={(event) =>
                  handleStatusChange(order.id, event.target.value)
                }
              >
                <option>Pending</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>

              <span>{order.date}</span>

              <div className="admin-actions">
                <button type="button" onClick={() => setSelectedOrder(order)}>
                  <FiEye />
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteOrder(order.id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="admin-empty-row">No orders found.</div>
          )}
        </div>
      </div>

      {selectedOrder && (
  <div className="admin-modal-overlay">
    <div className="admin-modal order-details-modal">
      <div className="admin-modal-header">
        <h2>Order Details</h2>

        <button
          type="button"
          onClick={() => setSelectedOrder(null)}
        >
          ×
        </button>
      </div>

      <div className="order-details-grid">
        <p>
          <strong>Order ID:</strong> {selectedOrder.id}
        </p>

        <p>
          <strong>Customer:</strong> {selectedOrder.customer}
        </p>

        <p>
          <strong>Phone:</strong> {selectedOrder.phone}
        </p>

        <p>
          <strong>Address:</strong> {selectedOrder.address}
        </p>

        <p>
          <strong>Status:</strong> {selectedOrder.status}
        </p>

        <p>
          <strong>Date:</strong> {selectedOrder.date}
        </p>

        <p>
          <strong>Payment:</strong> {selectedOrder.paymentMethod}
        </p>

        <p>
          <strong>Subtotal:</strong> ₨{" "}
          {Number(
            selectedOrder.subtotal ?? selectedOrder.amount
          ).toLocaleString()}
        </p>

        <p>
          <strong>Shipping:</strong> ₨{" "}
          {Number(selectedOrder.shippingFee ?? 0).toLocaleString()}
        </p>

        <p>
          <strong>Discount:</strong> ₨{" "}
          {Number(selectedOrder.discount ?? 0).toLocaleString()}
        </p>

        <p>
          <strong>Total:</strong> ₨{" "}
          {Number(selectedOrder.amount).toLocaleString()}
        </p>

        {selectedOrder.couponCode && (
          <p>
            <strong>Coupon:</strong> {selectedOrder.couponCode}
          </p>
        )}
      </div>

      {selectedOrder.items && (
        <>
          <h3 style={{ marginTop: 30 }}>Ordered Items</h3>

          <div className="orders-table-admin">
            {selectedOrder.items.map((item) => (
              <div
                className="order-admin-row"
                key={item.id}
              >
                <span>{item.name}</span>

                <span>Qty : {item.quantity}</span>

                <strong>
                  ₨{" "}
                  {(
                    item.price * item.quantity
                  ).toLocaleString()}
                </strong>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  </div>
)}
        
    </div>
  );
}

export default Orders;