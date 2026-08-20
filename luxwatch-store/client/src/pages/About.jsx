import { FiAward, FiShield, FiTruck, FiWatch } from "react-icons/fi";
import "./About.css";

const stats = [
  { value: "20K+", label: "Happy Customers" },
  { value: "500+", label: "Luxury Watches" },
  { value: "25+", label: "Cities Served" },
  { value: "99%", label: "Positive Reviews" },
];

const features = [
  {
    icon: <FiAward />,
    title: "Premium Craftsmanship",
    text: "Every LuxWatch timepiece is selected for quality, elegance, and long-lasting style.",
  },
  {
    icon: <FiShield />,
    title: "Trusted Warranty",
    text: "Our watches include reliable warranty support for your peace of mind.",
  },
  {
    icon: <FiTruck />,
    title: "Fast Delivery",
    text: "Quick and secure delivery across Pakistan with careful packaging.",
  },
  {
    icon: <FiWatch />,
    title: "Modern Luxury",
    text: "Designed for gentlemen who want timeless style with a modern edge.",
  },
];

function About() {
  return (
    <main className="about-page">
      <section className="container about-hero">
        <span>About LuxWatch</span>
        <h1>Crafting Timeless Luxury for Modern Gentlemen</h1>
        <p>
          LuxWatch brings premium, elegant, and reliable watches for customers
          who value style, confidence, and quality.
        </p>
      </section>

      <section className="container about-story">
        <div>
          <span>Our Story</span>
          <h2>Luxury watches made simple, stylish, and accessible.</h2>
          <p>
            We started LuxWatch with one mission: to provide premium watches
            that look elegant, feel reliable, and match every special moment.
            From formal events to everyday confidence, our collection is built
            for people who appreciate detail and class.
          </p>
          <p>
            Every watch in our store is selected with attention to design,
            durability, comfort, and finishing.
          </p>
        </div>

        <div className="about-image-card">
          <img
            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80"
            alt="Luxury watch"
          />
        </div>
      </section>

      <section className="about-stats">
        <div className="container stats-grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container about-features">
        <div className="section-heading">
          <span>Why Choose Us</span>
          <h2>Premium experience from selection to delivery.</h2>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container about-cta">
        <span>Ready to upgrade your style?</span>
        <h2>Discover your perfect LuxWatch today.</h2>
        <a href="/shop">Explore Collection</a>
      </section>
    </main>
  );
}

export default About;