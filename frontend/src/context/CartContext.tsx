"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string | number;
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
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, delta: number) => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("cart");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (isMounted) localStorage.setItem("cart", JSON.stringify(items));
  }, [items, isMounted]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (product: any, qty: number = 1) => {
    if (qty <= 0) return; // Don't add if quantity is 0

    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      // Parse price
      const priceNumber = typeof product.price === 'string' 
        ? parseFloat(product.price.replace('$', '')) 
        : product.price;

      return [...prev, { ...product, price: priceNumber, quantity: qty }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (id: string | number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // --- THE FIX: REMOVE ITEM IF QUANTITY HITS 0 ---
  const updateQuantity = (id: string | number, delta: number) => {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + delta };
        }
        return item;
      }).filter((item) => item.quantity > 0); // <--- THIS LINE DELETES THE ITEM
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
