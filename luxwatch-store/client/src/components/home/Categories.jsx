import categories from "../../data/categories";
import "./Categories.css";

function Categories() {
  return (
    <section className="categories-section">
      <div className="container">

        <div className="section-heading">
          <span className="section-tag">
            Shop by Category
          </span>

          <h2>
            Find Your Perfect Watch
          </h2>

          <p>
            Browse our carefully selected watch collections.
          </p>
        </div>

        <div className="categories-grid">

          {categories.map((category) => (
            <article
              key={category.id}
              className="category-card"
            >
              <div className="category-icon">
              <category.icon />
              </div>

              <h3>{category.title}</h3>

              <p>{category.subtitle}</p>
            </article>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Categories;