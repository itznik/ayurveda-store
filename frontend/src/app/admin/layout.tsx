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
    const storedUser = localStorage.getItem("userInfo");
    
    if (!storedUser) {
      // FIX: Redirect to the main login page, not /admin/login
      router.push("/login"); 
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      if (user.role !== "admin" && user.role !== "super_admin") {
        router.push("/"); 
      } else {
        setIsAuthorized(true);
      }
    } catch (error) {
      localStorage.removeItem("userInfo");
      router.push("/login"); // FIX: Redirect to main login
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7F5] dark:bg-[#050505]">
        <Loader2 className="h-10 w-10 animate-spin text-luxury-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F4F7F5] dark:bg-[#050505] transition-colors duration-500">
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="md:hidden flex items-center justify-between p-4 bg-white/80 dark:bg-[#0A1A15]/80 backdrop-blur-md border-b border-neutral-200 dark:border-white/5 sticky top-0 z-40">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-luxury-dark dark:text-white">
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-serif font-bold text-luxury-dark dark:text-white">Admin Panel</span>
          <div className="w-8" />
        </header>
        <main className="p-4 md:p-10 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
