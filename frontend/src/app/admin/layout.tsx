"use client"; // Needs client for state

import { useState } from "react";
import { AdminSidebar } from "@/app/admin/AdminSidebar";
import { Menu } from "lucide-react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F4F7F5] dark:bg-[#050505] transition-colors duration-500">
      
      {/* SIDEBAR (Passes State) */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* CONTENT AREA */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* MOBILE HEADER (Visible only on small screens) */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white/80 dark:bg-[#0A1A15]/80 backdrop-blur-md border-b border-neutral-200 dark:border-white/5 sticky top-0 z-40">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-luxury-dark dark:text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-serif font-bold text-luxury-dark dark:text-white">Admin Panel</span>
          <div className="w-8" /> {/* Spacer to center text */}
        </header>

        {/* PAGE CONTENT */}
        <main className="p-4 md:p-10 overflow-x-hidden">
          {children}
        </main>
      </div>

    </div>
  );
}
