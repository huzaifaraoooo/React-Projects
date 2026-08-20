import brands from "../../data/brands";
import "./BrandStrip.css";

function BrandStrip() {
  return (
    <section className="brand-strip">
      <div className="container">

        <p className="brand-title">
          Trusted By Luxury Watch Enthusiasts
        </p>

        <div className="brand-slider">

          <div className="brand-track">

            {[...brands, ...brands].map((brand, index) => (
              <div
                className="brand-item"
                key={`${brand.id}-${index}`}
              >
                {brand.name}
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}

export default BrandStrip;