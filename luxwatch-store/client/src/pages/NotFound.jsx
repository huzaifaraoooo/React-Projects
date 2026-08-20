import { Link } from "react-router-dom";
import { FiHome, FiArrowLeft } from "react-icons/fi";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-card">
        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <div className="not-found-actions">
          <Link to="/">
            <FiHome />
            Go Home
          </Link>

          <button onClick={() => window.history.back()}>
            <FiArrowLeft />
            Go Back
          </button>
        </div>
      </section>
    </main>
  );
}

export default NotFound;