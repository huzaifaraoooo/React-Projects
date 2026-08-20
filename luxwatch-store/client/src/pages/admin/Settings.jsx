import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./Settings.css";

const STORAGE_KEY = "luxwatch-settings";

const defaultSettings = {
  storeName: "LuxWatch",
  storeEmail: "support@luxwatch.pk",
  phone: "+92 300 1234567",
  address: "Lahore, Pakistan",
  currency: "PKR",
  shippingFee: 500,
  freeShippingLimit: 50000,
};

function Settings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Settings Saved Successfully");
  };

  return (
    <div className="admin-settings-page">
      <div className="admin-page-header">
        <div>
          <span className="admin-kicker">Settings</span>
          <h1>Website Settings</h1>
          <p>Manage your store information.</p>
        </div>
      </div>

      <form className="admin-table-card" onSubmit={handleSubmit}>
        <div className="form-grid">

          <label>
            Store Name
            <input
              type="text"
              name="storeName"
              value={settings.storeName}
              onChange={handleChange}
            />
          </label>

          <label>
            Store Email
            <input
              type="email"
              name="storeEmail"
              value={settings.storeEmail}
              onChange={handleChange}
            />
          </label>

          <label>
            Phone Number
            <input
              type="text"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
            />
          </label>

          <label>
            Currency
            <select
              name="currency"
              value={settings.currency}
              onChange={handleChange}
            >
              <option>PKR</option>
              <option>USD</option>
            </select>
          </label>

          <label>
            Shipping Fee
            <input
              type="number"
              name="shippingFee"
              value={settings.shippingFee}
              onChange={handleChange}
            />
          </label>

          <label>
            Free Shipping Limit
            <input
              type="number"
              name="freeShippingLimit"
              value={settings.freeShippingLimit}
              onChange={handleChange}
            />
          </label>

          <label className="full-field">
            Store Address
            <textarea
              rows="4"
              name="address"
              value={settings.address}
              onChange={handleChange}
            />
          </label>

        </div>

        <button className="admin-primary-btn">
          Save Settings
        </button>
      </form>
    </div>
  );
}

export default Settings;