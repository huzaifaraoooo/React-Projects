import { createContext, useContext, useEffect, useMemo, useState } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem("luxwatch-wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("luxwatch-wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    setWishlistItems((currentItems) => {
      const exists = currentItems.some((item) => item.id === product.id);

      if (exists) {
        return currentItems.filter((item) => item.id !== product.id);
      }

      return [...currentItems, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const wishlistCount = wishlistItems.length;

  const value = useMemo(
    () => ({
      wishlistItems,
      wishlistCount,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
    }),
    [wishlistItems]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
}