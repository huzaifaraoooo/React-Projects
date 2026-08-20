export function filterProducts(products, filters) {
  const { categories, brands, maxPrice } = filters;

  return products.filter((product) => {
    const matchCategory =
      categories.length === 0 || categories.includes(product.category);

    const matchBrand =
      brands.length === 0 || brands.includes(product.brand);

    const matchPrice = Number(product.price) <= Number(maxPrice);

    return matchCategory && matchBrand && matchPrice;
  });
}