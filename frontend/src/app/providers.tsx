"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartProvider } from "@/context/CartContext";
import { SocketProvider } from "@/context/SocketContext";

// Theme Context
type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = storedTheme === "dark" || (!storedTheme && prefersDark);

    setIsDark(dark);

    if (dark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);

    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // Important: MUST wrap providers even before mounted
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SocketProvider>
        <CartProvider>
          {/* Only children wait for mounted */}
          {mounted ? children : null}
        </CartProvider>
      </SocketProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
