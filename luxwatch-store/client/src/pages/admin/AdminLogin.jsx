import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      loginData.email === "admin@luxwatch.com" &&
      loginData.password === "admin123"
    ) {
      localStorage.setItem("luxwatch-admin-auth", "true");
      toast.success("Admin login successful!");
      navigate("/admin");
      return;
    }

    toast.error("Invalid email or password");
  };

  return (
    <main className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <h1>
          Lux<span>Watch</span>
        </h1>

        <p>Login to your admin dashboard</p>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            placeholder="admin@luxwatch.com"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            placeholder="admin123"
            required
          />
        </label>

        <button type="submit">Login</button>

        <small>
          Demo: admin@luxwatch.com / admin123
        </small>
      </form>
    </main>
  );
}

export default AdminLogin;