import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./AdminLayout.css";

function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Topbar />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;