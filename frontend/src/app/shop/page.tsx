"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import ProductCard from "@/components/shop/ProductCard"; // Default import
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import API from "@/lib/api";
import { Product } from "@/types";
import { Loader2 } from "lucide-react";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("View All");

  // 1. Fetch Real Data from Backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch shop products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 2. Generate Dynamic Categories from Data
  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(products.map((p) => p.category)));
    return ["View All", ...uniqueCats];
  }, [products]);

  // 3. Filter Logic
  const filteredProducts = activeCategory === "View All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

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
                {categories.map((cat) => (
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
            {loading ? (
               <div className="flex justify-center py-20">
                  <Loader2 className="animate-spin w-10 h-10 text-luxury-primary" />
               </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="py-20 text-center text-neutral-500 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-xl">
                    <p>No products found in this category.</p>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
