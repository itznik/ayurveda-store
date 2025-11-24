"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/app/admin/AdminSidebar";
import { Menu, Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 1. Check if user is logged in
    const storedUser = localStorage.getItem("userInfo");
    
    if (!storedUser) {
      router.push("/login"); 
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      
      // 2. Check Role (Must be Admin or Super Admin)
      if (user.role !== "admin" && user.role !== "super_admin") {
        router.push("/"); // Kick normal users to homepage
      } else {
        setIsAuthorized(true); // Grant access
      }
    } catch (error) {
      // 3. If JSON is corrupt, logout and redirect
      localStorage.removeItem("userInfo");
      router.push("/login");
    }
  }, [router]);

  // Loading Screen (Prevents "Flash of Unauthorized Content")
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7F5] dark:bg-[#050505]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-luxury-primary" />
          <p className="text-sm font-bold tracking-widest text-neutral-500 uppercase animate-pulse">Verifying Access</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F4F7F5] dark:bg-[#050505] transition-colors duration-500">
      
      {/* SIDEBAR (Passes State for Mobile Toggle) */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* CONTENT AREA */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative">
        
        {/* MOBILE HEADER (Visible only on small screens) */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white/80 dark:bg-[#0A1A15]/80 backdrop-blur-md border-b border-neutral-200 dark:border-white/5 sticky top-0 z-40">
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="p-2 text-luxury-dark dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-serif font-bold text-luxury-dark dark:text-white tracking-wide">Admin Panel</span>
          <div className="w-8" /> {/* Spacer for centering */}
        </header>

        {/* PAGE CONTENT */}
        <main className="p-4 md:p-10 w-full max-w-[1600px] mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
