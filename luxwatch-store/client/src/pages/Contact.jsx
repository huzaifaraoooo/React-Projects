import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiClock,
} from "react-icons/fi";

import "./Contact.css";

function Contact() {
  return (
    <main className="contact-page">

      <section className="container contact-hero">
        <span>Contact Us</span>

        <h1>
          We'd Love To
          <br />
          Hear From You
        </h1>

        <p>
          Have questions about our watches, your order, or
          need assistance? Our team is always ready to help.
        </p>
      </section>

      <section className="container contact-layout">

        <div className="contact-info">

          <div className="contact-card">
            <FiPhone />

            <div>
              <h3>Phone</h3>
              <p>+92 300 0056105</p>
            </div>
          </div>

          <div className="contact-card">
            <FiMail />

            <div>
              <h3>Email</h3>
              <p>huzaifaraoooo@gmail.com</p>
            </div>
          </div>

          <div className="contact-card">
            <FiMapPin />

            <div>
              <h3>Address</h3>
              <p>Lahore, Pakistan</p>
            </div>
          </div>

          <div className="contact-card">
            <FiClock />

            <div>
              <h3>Working Hours</h3>
              <p>Mon - Sat (9 AM - 7 PM)</p>
            </div>
          </div>

        </div>

        <form className="contact-form">

          <div className="contact-grid">

            <input
              type="text"
              placeholder="Your Name"
            />

            <input
              type="email"
              placeholder="Email Address"
            />

            <input
              type="text"
              placeholder="Phone Number"
            />

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              rows="7"
              placeholder="Write your message..."
            ></textarea>

          </div>

          <button type="submit">
            Send Message
          </button>

        </form>

      </section>

    </main>
  );
}

export default Contact;