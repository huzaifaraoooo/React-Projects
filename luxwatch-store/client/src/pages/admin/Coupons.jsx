import { useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

const COUPONS_KEY = "luxwatch-coupons";

const defaultCoupons = [
  {
    id: 1,
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minOrder: 5000,
    status: "Active",
  },
  {
    id: 2,
    code: "EID500",
    type: "fixed",
    value: 500,
    minOrder: 3000,
    status: "Active",
  },
];

function Coupons() {
  const [coupons, setCoupons] = useState(() => {
    const saved = localStorage.getItem(COUPONS_KEY);
    return saved ? JSON.parse(saved) : defaultCoupons;
  });

  const [formData, setFormData] = useState({
    code: "",
    type: "percentage",
    value: "",
    minOrder: "",
    status: "Active",
  });

  const [editingCoupon, setEditingCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem(COUPONS_KEY, JSON.stringify(coupons));
  }, [coupons]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      code: "",
      type: "percentage",
      value: "",
      minOrder: "",
      status: "Active",
    });

    setEditingCoupon(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.code.trim()) {
      toast.error("Coupon code is required");
      return;
    }

    const couponData = {
      ...formData,
      code: formData.code.toUpperCase(),
      value: Number(formData.value),
      minOrder: Number(formData.minOrder),
    };

    if (editingCoupon) {
      setCoupons((prev) =>
        prev.map((coupon) =>
          coupon.id === editingCoupon.id
            ? { ...couponData, id: editingCoupon.id }
            : coupon
        )
      );

      toast.success("Coupon updated");
      resetForm();
      return;
    }

    setCoupons((prev) => [{ ...couponData, id: Date.now() }, ...prev]);
    toast.success("Coupon added");
    resetForm();
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setFormData(coupon);
  };

  const handleDelete = (couponId) => {
    const confirmDelete = window.confirm("Delete this coupon?");
    if (!confirmDelete) return;

    setCoupons((prev) => prev.filter((coupon) => coupon.id !== couponId));
    toast.success("Coupon deleted");
  };

  return (
    <div className="admin-coupons-page">
      <div className="admin-page-header">
        <div>
          <span className="admin-kicker">Coupons</span>
          <h1>Manage Coupons</h1>
          <p>Create discount codes for your customers.</p>
        </div>
      </div>

      <div className="category-layout">
        <form className="category-form-card" onSubmit={handleSubmit}>
          <h2>{editingCoupon ? "Edit Coupon" : "Add Coupon"}</h2>

          <label>
            Coupon Code
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="WELCOME10"
              required
            />
          </label>

          <label>
            Discount Type
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="percentage">Percentage %</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </label>

          <label>
            Discount Value
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder="10"
              required
            />
          </label>

          <label>
            Minimum Order
            <input
              type="number"
              name="minOrder"
              value={formData.minOrder}
              onChange={handleChange}
              placeholder="5000"
              required
            />
          </label>

          <label>
            Status
            <select name="status" value={formData.status} onChange={handleChange}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </label>

          <button className="admin-primary-btn" type="submit">
            <FiPlus />
            {editingCoupon ? "Update Coupon" : "Add Coupon"}
          </button>

          {editingCoupon && (
            <button className="admin-cancel-btn" type="button" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </form>

        <div className="admin-table-card">
          <div className="admin-table-header">
            <h2>Coupon List</h2>
            <span>{coupons.length} coupons</span>
          </div>

          <div className="category-table">
            {coupons.map((coupon) => (
              <div className="category-row" key={coupon.id}>
                <div>
                  <strong>{coupon.code}</strong>
                  <small>
                    {coupon.type === "percentage"
                      ? `${coupon.value}% OFF`
                      : `₨ ${coupon.value.toLocaleString()} OFF`}{" "}
                    | Min Order ₨ {coupon.minOrder.toLocaleString()} |{" "}
                    {coupon.status}
                  </small>
                </div>

                <div className="admin-actions">
                  <button type="button" onClick={() => handleEdit(coupon)}>
                    <FiEdit2 />
                  </button>

                  <button type="button" onClick={() => handleDelete(coupon.id)}>
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coupons;