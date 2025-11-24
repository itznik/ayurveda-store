"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Users, Package, Settings, BarChart3, LogOut, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ENABLED ALL LINKS since we created all these pages
const MENU_ITEMS = [
  { name: "Dashboard", icon: <LayoutDashboard />, href: "/admin/dashboard" },
  { name: "Orders", icon: <ShoppingBag />, href: "/admin/orders" },
  { name: "Products", icon: <Package />, href: "/admin/products" },
  { name: "Customers", icon: <Users />, href: "/admin/customers" },
  { name: "Analytics", icon: <BarChart3 />, href: "/admin/analytics" },
  { name: "Settings", icon: <Settings />, href: "/admin/settings" },
];

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clear Admin Session
    localStorage.removeItem("userInfo");
    // Redirect to Login
    router.push("/login");
  };

  // Sidebar Content Component
  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#F4F7F5] dark:bg-[#0A1A15] border-r border-neutral-200 dark:border-white/5">
      
      {/* Logo Area */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-neutral-200 dark:border-white/5">
        <Link href="/">
            <h1 className="font-serif text-xl tracking-widest font-bold text-luxury-dark dark:text-white cursor-pointer">
            AYURLUXE
            <span className="ml-2 text-[10px] font-sans text-luxury-primary dark:text-emerald-400 tracking-[0.2em]">
                ADMIN
            </span>
            </h1>
        </Link>
        {/* Close Button (Mobile Only) */}
        <button onClick={() => setIsOpen(false)} className="md:hidden text-neutral-500">
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              onClick={() => setIsOpen(false)} // Close on click (Mobile)
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? "bg-luxury-primary text-white shadow-lg shadow-luxury-primary/20" 
                  : "text-neutral-500 dark:text-neutral-400 hover:bg-white dark:hover:bg-white/5 hover:text-luxury-dark dark:hover:text-white"
              }`}
            >
              <div className={`p-1 rounded-lg transition-colors ${isActive ? "text-white" : "group-hover:text-luxury-primary dark:group-hover:text-emerald-400"}`}>
                 {item.icon}
              </div>
              <span className="font-bold text-sm tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-200 dark:border-white/5">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-bold text-sm">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR (Always Visible) */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 h-screen">
        <SidebarContent />
      </aside>

      {/* MOBILE OVERLAY & SIDEBAR */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            
            {/* Slide-out Sidebar */}
            <motion.div 
              initial={{ x: "-100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 z-[70] md:hidden h-full"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
