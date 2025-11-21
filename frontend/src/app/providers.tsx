"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartProvider } from "@/context/CartContext";
import { SocketProvider } from "@/context/SocketContext";

// Define the shape of our manual context
type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({ 
  isDark: false, 
  toggleTheme: () => {} 
});

// RENAMED to 'Providers' because it wraps everything (Cart, Socket, Theme)
export function Providers({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 1. Check if user previously saved a preference
    const storedTheme = localStorage.getItem("theme");
    
    // 2. Check if their phone is in dark mode
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // 3. Decide initial state (Stored takes priority)
    const shouldBeDark = storedTheme === "dark" || (!storedTheme && systemDark);

    setIsDark(shouldBeDark);
    applyTheme(shouldBeDark);
  }, []);

  const applyTheme = (dark: boolean) => {
    const root = document.documentElement; // This selects the <html> tag
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    applyTheme(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // Prevent hydration mismatch
  if (!mounted) return <>{children}</>;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SocketProvider> {/* Real-Time Connection */}
        <CartProvider>   {/* Cart Logic */}
          {children}
        </CartProvider>
      </SocketProvider>
    </ThemeContext.Provider>
  );
}

// Custom Hook to use the theme anywhere
export const useTheme = () => useContext(ThemeContext);
