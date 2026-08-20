import { Link } from "react-router-dom";
import heroWatch from "../../assets/images/hero/hero1-watch.png";
import "./Hero.css";

const heroStats = [
  {
    id: 1,
    value: "12K+",
    label: "Happy Customers",
  },
  {
    id: 2,
    value: "250+",
    label: "Luxury Watches",
  },
  {
    id: 3,
    value: "4.9★",
    label: "Average Rating",
  },
];

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-glow hero-glow-left" />
      <div className="hero-glow hero-glow-right" />

      <div className="container hero-container">
        <div className="hero-content">
          <p className="hero-badge">Luxury Collection 2026</p>

          <h1 className="hero-title">
            Timeless Watches for Modern Gentlemen
          </h1>

          <p className="hero-description">
            Discover premium watches crafted with elegance, precision, and
            luxury for every special moment.
          </p>

          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary">
              Shop Now
            </Link>

            <Link to="/about" className="btn btn-outline">
              Explore Story
            </Link>
          </div>

          <div className="hero-stats">
            {heroStats.map((stat) => (
              <div className="hero-stat" key={stat.id}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-label="Luxury watch preview">
          <div className="hero-watch-orbit">
            <span className="orbit-dot orbit-dot-one" />
            <span className="orbit-dot orbit-dot-two" />
            <span className="orbit-dot orbit-dot-three" />

            <img
              src={heroWatch}
              alt="Luxury two-tone chronograph wristwatch"
              className="hero-watch-image"
            />
          </div>

          <div className="hero-trust-card">
            <span>Trusted Luxury</span>
            <strong>Since 2015</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;