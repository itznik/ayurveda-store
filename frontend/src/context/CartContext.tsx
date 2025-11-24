"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Updated to match MongoDB Structure
export interface CartItem {
  _id: string; // Changed from 'id' to '_id' to match DB
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: any, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    if (isMounted) localStorage.setItem("cart", JSON.stringify(items));
  }, [items, isMounted]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (product: any, qty: number = 1) => {
    if (qty <= 0) return;

    // 🛠️ CRITICAL FIX: Handle both MongoDB '_id' and legacy 'id'
    // If the product comes from DB, it has '_id'. If from static file, it might have 'id'.
    const productId = product._id || product.id;

    if (!productId) {
      console.error("Product has no ID:", product);
      return;
    }

    setItems((prev) => {
      // Check if item already exists using the unified ID
      const existing = prev.find((item) => item._id === productId);

      if (existing) {
        return prev.map((item) =>
          item._id === productId ? { ...item, quantity: item.quantity + qty } : item
        );
      }

      // Clean Price (Handle string "$100" or number 100)
      const priceNumber = typeof product.price === 'string' 
        ? parseFloat(product.price.replace('$', '')) 
        : product.price;

      return [
        ...prev, 
        { 
          ...product, 
          _id: productId, // Normalize to _id
          price: priceNumber, 
          quantity: qty 
        }
      ];
    });
    setIsOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) => {
      return prev.map((item) => {
        if (item._id === id) {
          return { ...item, quantity: item.quantity + delta };
        }
        return item;
      }).filter((item) => item.quantity > 0); // Remove if 0
    });
  };

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, isOpen, openCart, closeCart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
