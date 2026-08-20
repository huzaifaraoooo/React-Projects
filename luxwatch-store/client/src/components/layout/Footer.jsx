import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiMapPin,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Logo */}
        <div>
          <h2 className="footer-logo">
            Lux<span>Watch</span>
          </h2>

          <p className="footer-text">
            Discover premium luxury watches crafted with elegance,
            precision, and timeless style. We deliver quality watches
            across Pakistan.
          </p>

          <div className="footer-social">
            <a href="#">
              <FiFacebook />
            </a>

            <a href="#">
              <FiInstagram />
            </a>

            <a href="#">
              <FiTwitter />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3>Quick Links</h3>

          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3>Categories</h3>

          <ul>
            <li>Luxury</li>
            <li>Automatic</li>
            <li>Chronograph</li>
            <li>Sport</li>
            <li>Classic</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3>Contact</h3>

          <ul className="footer-contact">
            <li>
              <FiMapPin />
              Lahore, Pakistan
            </li>

            <li>
              <FiPhone />
              +92 300 1234567
            </li>

            <li>
              <FiMail />
              support@luxwatch.pk
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © {year} LuxWatch. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;