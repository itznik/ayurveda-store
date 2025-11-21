"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartProvider } from "@/context/CartContext";
import { SocketProvider } from "@/context/SocketContext";

// 1. Theme Context
type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({ 
  isDark: false, 
  toggleTheme: () => {} 
});

// 2. Master Provider Component
export function Providers({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = storedTheme === "dark" || (!storedTheme && systemDark);

    setIsDark(shouldBeDark);
    if (shouldBeDark) document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  if (!mounted) return <>{children}</>;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SocketProvider>
        {/* CRITICAL: CartProvider must wrap children here */}
        <CartProvider>
          {children}
        </CartProvider>
      </SocketProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
