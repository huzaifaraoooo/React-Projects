import ProductCard from "../../common/ProductCard";
import "./ProductGrid.css";

function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <section className="product-grid-section">
        <div className="empty-products">
          <h3>No products found</h3>
          <p>Try searching with another watch name, brand, or category.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="product-grid-section">
      <div className="product-grid-header">
        <p>
          Showing <strong>{products.length}</strong> premium watches
        </p>
      </div>

      <div className="shop-product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;