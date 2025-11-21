"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { ProductCard } from "@/components/shop/ProductCard";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

// MOCK DATA (We'll connect DB later)
const PRODUCTS = [
  { id: 1, name: "Kumkumadi Tailam", price: "$45.00", category: "Face Oils", isNew: true, image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "Saffron Elixir", price: "$62.00", category: "Serums", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "Rose Water Mist", price: "$28.00", category: "Toners", image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800&auto=format&fit=crop" },
  { id: 4, name: "Bhringraj Hair Oil", price: "$35.00", category: "Hair Care", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop" },
  { id: 5, name: "Sandalwood Mask", price: "$40.00", category: "Face Masks", isNew: true, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop" },
  { id: 6, name: "Jasmine Body Oil", price: "$55.00", category: "Body Care", image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=800&auto=format&fit=crop" },
];

const CATEGORIES = ["View All", "Face Oils", "Serums", "Hair Care", "Body Care", "Wellness"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("View All");

  const filteredProducts = activeCategory === "View All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#F4F7F5] dark:bg-[#050505] transition-colors duration-500">
      <Navbar />

      {/* HEADER SECTION */}
      <section className="pt-32 pb-12 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl text-luxury-dark dark:text-white mb-6">
            The Apothecary
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Discover our curated collection of ancient ayurvedic remedies, 
            crafted with pure botanicals and modern science.
          </p>
        </motion.div>
      </section>

      {/* MAIN CATALOG */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* SIDEBAR FILTERS (Desktop) / SCROLLBAR (Mobile) */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-32">
              <h3 className="font-serif text-lg text-luxury-dark dark:text-white mb-6 hidden md:block">
                Categories
              </h3>
              
              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 no-scrollbar">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-4 py-2 md:px-0 md:py-2 text-left text-sm transition-all rounded-full md:rounded-none ${
                      activeCategory === cat
                        ? "bg-luxury-primary text-white md:bg-transparent md:text-luxury-primary md:dark:text-emerald-400 md:font-bold md:pl-2 md:border-l-2 md:border-luxury-primary md:dark:border-emerald-400"
                        : "bg-white dark:bg-neutral-900 md:bg-transparent md:text-neutral-500 md:hover:text-luxury-dark md:dark:hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* PRODUCT GRID */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center text-neutral-500">
                No products found in this category.
              </div>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
