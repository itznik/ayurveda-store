"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, User, LayoutDashboard, LogOut } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { openCart, cartCount } = useCart();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // --- BACKEND CONNECTION STATE ---
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem("userInfo");
      if (data) {
        setUserInfo(JSON.parse(data));
      }
    }
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const getProfileLink = () => {
    if (!userInfo) return "/login";
    if (userInfo.role === "admin" || userInfo.role === "super_admin") return "/admin/dashboard";
    return "/account";
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-[50] transition-all duration-300",
          scrolled || isMobileMenuOpen
            ? "bg-white/80 dark:bg-luxury-dark/80 backdrop-blur-xl border-b border-luxury-primary/10 shadow-sm" 
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* LEFT: Mobile Menu Trigger */}
            <div className="flex items-center md:hidden z-[60]">
              <button 
                onClick={toggleMenu}
                className="p-2 text-neutral-800 dark:text-white focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* CENTER: Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="font-serif text-2xl tracking-wider font-bold text-neutral-900 dark:text-white">
                AYURLUXE
              </Link>
            </div>

            {/* CENTER-RIGHT: Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 mx-8">
              {[
                { name: "Shop", href: "/shop" },
                { name: "About", href: "/about" },
                { name: "Journal", href: "/journal" }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium uppercase tracking-widest text-neutral-600 hover:text-luxury-primary dark:text-neutral-300 dark:hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* RIGHT: Action Icons */}
            <div className="flex items-center space-x-1 md:space-x-4">
              
              <div className="hidden sm:block">
                 <ThemeToggle />
              </div>
              
              {/* FIX: Removed 'hidden md:block' so this shows on mobile too */}
              <Link 
                href={getProfileLink()} 
                className="p-2 text-neutral-800 dark:text-white hover:opacity-70 relative"
                title={userInfo ? `Logged in as ${userInfo.name}` : "Login"}
              >
                 {userInfo?.role === 'admin' ? <LayoutDashboard className="h-5 w-5" /> : <User className="h-5 w-5" />}
                 
                 {/* Green Dot indicator if logged in */}
                 {userInfo && (
                   <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-green-500 rounded-full border border-white dark:border-black"></span>
                 )}
              </Link>
              
              <button 
                onClick={openCart} 
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
            className="fixed inset-0 z-[40] pt-24 bg-white dark:bg-luxury-dark md:hidden flex flex-col"
          >
            {/* Menu Links */}
            <div className="flex flex-col items-center space-y-8 p-4 flex-1">
              {[
                { name: "Shop", href: "/shop" },
                { name: "Collections", href: "/shop" },
                { name: "About", href: "/about" },
                { name: "Journal", href: "/journal" }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-2xl text-neutral-900 dark:text-white hover:text-luxury-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Footer Actions */}
            <div className="p-8 border-t border-neutral-100 dark:border-white/10 bg-neutral-50 dark:bg-black/20">
               <div className="flex flex-col gap-4">
                  {/* Explicit Account Button for Mobile */}
                  <Link 
                    href={getProfileLink()}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-4 rounded-xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex items-center justify-center gap-3 font-bold text-luxury-dark dark:text-white shadow-sm"
                  >
                    {userInfo ? (
                        <>
                           {userInfo.role === 'admin' ? <LayoutDashboard size={18} /> : <User size={18} />}
                           My Account
                        </>
                    ) : (
                        <>
                           <User size={18} />
                           Login / Register
                        </>
                    )}
                  </Link>
                  
                  {/* Mobile Theme Toggle */}
                  <div className="flex justify-center">
                     <ThemeToggle />
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
