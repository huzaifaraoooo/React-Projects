import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";

import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <App />

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 800,
              style: {
                background: "#111827",
                color: "#ffffff",
                border: "1px solid #d4af37",
              },
            }}
          />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);