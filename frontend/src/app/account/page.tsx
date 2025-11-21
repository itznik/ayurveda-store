"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Package, MapPin, Heart, LogOut, User, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <main className="min-h-screen bg-[#F4F7F5] dark:bg-[#050505] transition-colors duration-500">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
        
        {/* HEADER */}
        <div className="mb-12 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-luxury-primary text-white flex items-center justify-center text-2xl font-serif">
            AV
          </div>
          <div>
            <h1 className="font-serif text-3xl text-luxury-dark dark:text-white">Namaste, Arya</h1>
            <p className="text-neutral-500 dark:text-neutral-400">Member since 2024 • Gold Tier</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR MENU */}
          <div className="space-y-2">
            <MenuButton 
              icon={<Package />} label="My Orders" active={activeTab === "orders"} 
              onClick={() => setActiveTab("orders")} 
            />
            <MenuButton 
              icon={<MapPin />} label="Addresses" active={activeTab === "addresses"} 
              onClick={() => setActiveTab("addresses")} 
            />
            <MenuButton 
              icon={<Heart />} label="Wishlist" active={activeTab === "wishlist"} 
              onClick={() => setActiveTab("wishlist")} 
            />
            <MenuButton 
              icon={<User />} label="Account Settings" active={activeTab === "settings"} 
              onClick={() => setActiveTab("settings")} 
            />
            <div className="pt-4 border-t border-neutral-200 dark:border-white/10 mt-4">
              <button className="flex items-center gap-3 px-5 py-3 w-full text-left rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium">
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </div>
          </div>

          {/* CONTENT AREA */}
          <div className="lg:col-span-3 bg-white dark:bg-white/5 rounded-3xl border border-neutral-100 dark:border-white/5 p-8 min-h-[500px]">
            
            {activeTab === "orders" && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl text-luxury-dark dark:text-white mb-6">Order History</h2>
                {/* Mock Order */}
                <div className="border border-neutral-200 dark:border-white/10 rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-bold text-luxury-dark dark:text-white">Order #AY-8821</p>
                      <p className="text-sm text-neutral-500">Placed on Oct 24, 2024</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      Delivered
                    </span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-neutral-100 rounded-lg">
                        <img src="https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&w=200" className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div className="w-16 h-16 bg-neutral-100 rounded-lg">
                         <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200" className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div className="flex-1 text-right">
                         <p className="text-sm text-neutral-500">Total Amount</p>
                         <p className="font-bold text-lg text-luxury-dark dark:text-white">$107.00</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-white/5 flex justify-end">
                     <button className="text-sm font-bold text-luxury-primary dark:text-emerald-400 flex items-center gap-1 hover:underline">
                        View Details <ChevronRight className="h-4 w-4" />
                     </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
                <div className="text-center py-20 text-neutral-500">
                    <MapPin className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>You haven't saved any addresses yet.</p>
                    <button className="mt-4 text-luxury-primary font-bold">Add New Address</button>
                </div>
            )}
             
            {/* Add other tabs as needed */}

          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

function MenuButton({ icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-5 py-4 w-full text-left rounded-2xl transition-all duration-300 ${
        active 
        ? "bg-luxury-primary text-white shadow-lg" 
        : "text-neutral-600 dark:text-neutral-400 hover:bg-white dark:hover:bg-white/5"
      }`}
    >
      {React.cloneElement(icon, { className: "h-5 w-5" })}
      <span className="font-bold text-sm tracking-wide">{label}</span>
      {active && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
    </button>
  );
}

import React from "react";
