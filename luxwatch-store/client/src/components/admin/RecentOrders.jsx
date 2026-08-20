function RecentOrders() {
  const orders = JSON.parse(
    localStorage.getItem("luxwatch-orders")
  ) || [];

  const recentOrders = orders.slice(0, 5);

  return (
    <section className="recent-orders">
      <div className="admin-section-header">
        <h2>Recent Orders</h2>
        <p>Latest customer orders overview.</p>
      </div>

      <div className="orders-table">
        {recentOrders.length > 0 ? (
          recentOrders.map((order) => (
            <div className="order-row" key={order.id}>
              <span>{order.customer}</span>

              <span>{order.product}</span>

              <strong>
                ₨ {Number(order.amount).toLocaleString()}
              </strong>

              <em>{order.status}</em>
            </div>
          ))
        ) : (
          <div className="admin-empty-row">
            No recent orders.
          </div>
        )}
      </div>
    </section>
  );
}

export default RecentOrders;