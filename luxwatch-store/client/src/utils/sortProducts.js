export function sortProducts(products, sortBy) {
  const sortedProducts = [...products];

  switch (sortBy) {
    case "price-low":
      return sortedProducts.sort((a, b) => a.price - b.price);

    case "price-high":
      return sortedProducts.sort((a, b) => b.price - a.price);

    case "rating":
      return sortedProducts.sort((a, b) => b.rating - a.rating);

    case "newest":
      return sortedProducts.sort((a, b) => b.id - a.id);

    default:
      return sortedProducts;
  }
}