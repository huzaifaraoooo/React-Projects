export function searchProducts(products, searchTerm) {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  if (!normalizedSearch) {
    return products;
  }

  return products.filter((product) => {
    return (
      product.name.toLowerCase().includes(normalizedSearch) ||
      product.brand.toLowerCase().includes(normalizedSearch) ||
      product.category.toLowerCase().includes(normalizedSearch) ||
      product.sku.toLowerCase().includes(normalizedSearch)
    );
  });
}