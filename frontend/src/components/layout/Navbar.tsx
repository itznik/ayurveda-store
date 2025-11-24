"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, Menu, X, User, LogOut, LayoutDashboard, ArrowRight } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { openCart, cartCount } = useCart();
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const router = useRouter();
  
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  // Check Auth on Mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem("userInfo");
      if (data) setUserInfo(JSON.parse(data));
    }
  }, [pathname]); 

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    setIsMobileMenuOpen(false);
    router.push("/login");
  };

  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Journal", href: "/journal" }
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[50] transition-all duration-500 ease-in-out border-b border-transparent",
          scrolled || isMobileMenuOpen
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl border-neutral-200/50 dark:border-white/10 shadow-sm py-3" 
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* LEFT: Mobile Menu Trigger */}
            <div className="flex items-center md:hidden z-[60]">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 -ml-2 text-luxury-dark dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* CENTER: Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group" onClick={() => router.push('/')}>
              <div className="w-8 h-8 bg-luxury-primary rounded-tr-xl rounded-bl-xl group-hover:rotate-45 transition-transform duration-500"></div>
              <span className="font-serif text-2xl tracking-wider font-bold text-luxury-dark dark:text-white">
                AYURLUXE
              </span>
            </div>

            {/* CENTER-RIGHT: Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 mx-8">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium uppercase tracking-widest transition-all duration-300 relative group",
                    pathname === item.href 
                      ? "text-luxury-primary font-bold" 
                      : "text-neutral-600 hover:text-luxury-primary dark:text-neutral-300 dark:hover:text-white"
                  )}
                >
                  {item.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-luxury-primary transition-all duration-300 group-hover:w-full",
                    pathname === item.href ? "w-full" : ""
                  )}></span>
                </Link>
              ))}
            </nav>

            {/* RIGHT: Action Icons */}
            <div className="flex items-center gap-1 md:gap-4">
              
              {/* THEME TOGGLE: Now Visible on Mobile too */}
              <div className="block"> 
                 <ThemeToggle />
              </div>
              
              {/* LOGIN / PROFILE BUTTON (Desktop Only - Mobile has it in Menu) */}
              {userInfo ? (
                <Link 
                  href={userInfo.role === 'admin' ? "/admin/dashboard" : "/account"}
                  className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-white/20 hover:bg-neutral-50 dark:hover:bg-white/10 transition-all group"
                >
                   <div className="w-6 h-6 rounded-full bg-luxury-primary text-white flex items-center justify-center text-xs font-bold">
                      {userInfo.name?.charAt(0).toUpperCase()}
                   </div>
                   <span className="text-xs font-bold text-luxury-dark dark:text-white max-w-[80px] truncate">
                      {userInfo.name.split(' ')[0]}
                   </span>
                </Link>
              ) : (
                <Link href="/login" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-luxury-dark dark:text-white hover:text-luxury-primary transition-colors">
                   Sign In
                </Link>
              )}
              
              {/* CART BUTTON */}
              <button 
                onClick={openCart} 
                className="relative p-2 text-luxury-dark dark:text-white hover:scale-110 transition-transform"
              >
                <ShoppingBag className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-luxury-primary text-[10px] font-bold text-white ring-2 ring-white dark:ring-black">
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 z-[40] bg-white dark:bg-black pt-24 px-6 overflow-y-auto flex flex-col"
          >
            {/* Mobile Links */}
            <nav className="flex flex-col space-y-6 mt-8">
              {navLinks.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-3xl font-serif font-medium text-luxury-dark dark:text-white"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Footer Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-auto mb-10 pt-8 border-t border-neutral-100 dark:border-white/10 space-y-4"
            >
               {userInfo ? (
                 <div className="space-y-3">
                    <div className="flex items-center gap-3 mb-4">
                       <div className="w-12 h-12 rounded-full bg-luxury-primary text-white flex items-center justify-center text-lg font-bold">
                          {userInfo.name?.charAt(0)}
                       </div>
                       <div>
                          <p className="font-bold text-lg dark:text-white">{userInfo.name}</p>
                          <p className="text-sm text-neutral-500">{userInfo.email}</p>
                       </div>
                    </div>
                    
                    <Link 
                      href={userInfo.role === 'admin' ? "/admin/dashboard" : "/account"}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between w-full p-4 bg-neutral-50 dark:bg-white/5 rounded-xl font-bold text-luxury-dark dark:text-white"
                    >
                       <span>{userInfo.role === 'admin' ? "Admin Dashboard" : "My Account"}</span>
                       <LayoutDashboard className="h-5 w-5" />
                    </Link>

                    <button 
                      onClick={handleLogout}
                      className="flex items-center justify-between w-full p-4 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-xl font-bold"
                    >
                       <span>Sign Out</span>
                       <LogOut className="h-5 w-5" />
                    </button>
                 </div>
               ) : (
                 <Link 
                   href="/login"
                   onClick={() => setIsMobileMenuOpen(false)}
                   className="flex items-center justify-center gap-2 w-full py-4 bg-luxury-primary text-white rounded-xl font-bold text-lg shadow-lg"
                 >
                    Sign In <ArrowRight className="h-5 w-5" />
                 </Link>
               )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
