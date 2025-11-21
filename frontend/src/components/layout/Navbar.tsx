"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { openCart, cartCount } = useCart();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitors scroll to change background
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-[50] transition-all duration-300",
          scrolled || isMobileMenuOpen
            ? "bg-white/80 dark:bg-luxury-dark/80 backdrop-blur-xl border-b border-luxury-primary/10 shadow-sm" // GREEN LUXURY APPLIED HERE
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Mobile Menu Trigger */}
            <div className="flex items-center md:hidden z-[60]">
              <button 
                onClick={toggleMenu}
                className="p-2 text-neutral-800 dark:text-white focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="font-serif text-2xl tracking-wider font-bold text-neutral-900 dark:text-white">
                AYURLUXE
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {["Shop", "Collections", "About", "Journal"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-sm font-medium uppercase tracking-widest text-neutral-600 hover:text-luxury-primary dark:text-neutral-300 dark:hover:text-white transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>

            {/* Action Icons */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <ThemeToggle />
              
              <Link href="/login" className="hidden md:block p-2 text-neutral-800 dark:text-white hover:opacity-70">
                <User className="h-5 w-5" />
              </Link>
              
              <button 
  onClick={openCart} // Calls the function to open drawer
  className="relative p-2 text-neutral-800 dark:text-white hover:opacity-70"
>
  <ShoppingBag className="h-5 w-5" />
  {cartCount > 0 && (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-luxury-primary dark:bg-white dark:text-black rounded-full">
      {cartCount}
    </span>
  )}
</button>

            </div>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[40] pt-20 bg-white dark:bg-luxury-dark md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 p-4">
              {["Shop", "Collections", "About", "Journal", "Login"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-2xl text-neutral-900 dark:text-white hover:text-luxury-primary transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
