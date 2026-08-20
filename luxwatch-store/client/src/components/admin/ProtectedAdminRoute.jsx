import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const isLoggedIn =
    localStorage.getItem("luxwatch-admin-auth") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedAdminRoute;