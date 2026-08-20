import ProductCard from "../common/ProductCard";
import { getProducts } from "../../data/products-demo";
import "./FeaturedProducts.css";

function FeaturedProducts() {
  const products = getProducts();

  const homeProducts = products.filter(
    (product) => product.isFeatured === true
  );

  return (
    <section className="featured-section">
      <div className="container">
        <div className="section-header">
          <span className="section-kicker">Featured Collection</span>
          <h2>Premium Watches Picked for You</h2>
          <p>
            A curated collection of elegant timepieces designed for modern
            lifestyle, luxury events, and everyday confidence.
          </p>
        </div>

        <div className="featured-grid">
          {homeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {homeProducts.length === 0 && (
            <p className="featured-empty">
              No featured products selected yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;