"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Loader2 } from "lucide-react"; // Added Loader
import { motion, AnimatePresence } from "framer-motion";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import API from "@/lib/api"; // Import API Bridge
import { Product } from "@/types"; // Import Types
import { useCart } from "@/context/CartContext"; // Import Cart Logic

export function FeaturedCollection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); // Added Search State
  const { addToCart } = useCart(); // Connect Cart

  // 1. FETCH REAL DATA
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch collection", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 2. DYNAMIC CATEGORIES (Extract unique categories from DB data)
  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(products.map((p) => p.category)));
    return ["All", ...uniqueCats];
  }, [products]);

  // 3. FILTER LOGIC (Category + Search)
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return <div className="py-32 flex justify-center"><Loader2 className="animate-spin w-8 h-8 text-[#1a4d2e]" /></div>;
  }

  return (
    <section className="py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- CONTROL BAR --- */}
        <div className="relative -mt-32 mb-16 z-20">
          <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg shadow-2xl rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Search Input */}
            <div className="relative w-full md:w-1/3 group">
              <Search className="absolute left-0 top-2 h-5 w-5 text-neutral-400 group-focus-within:text-luxury-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-2 bg-transparent border-b border-neutral-300 dark:border-neutral-700 text-black dark:text-white focus:outline-none focus:border-luxury-primary transition-colors placeholder-neutral-400"
              />
            </div>

            {/* LOGIC: Render Categories from DB */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                    activeCategory === cat 
                    ? 'bg-luxury-primary text-white shadow-lg scale-105' 
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- HEADER --- */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 dark:text-white mb-2">
              {activeCategory} Collection
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400">
              {filteredProducts.length} premium items found
            </p>
          </div>
          <div className="hidden md:block">
            <LuxuryButton href="/shop" variant="outline" className="px-6 py-3 text-xs">
              View All
            </LuxuryButton>
          </div>
        </div>

        {/* --- GRID (With Animations) --- */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div 
                  layout
                  key={product._id} // Changed from id to _id
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative cursor-pointer"
                >
                  <div className="aspect-[4/5] overflow-hidden rounded-xl bg-neutral-200 dark:bg-neutral-800 mb-4 relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    
                    {/* Add Button (Connected to Context) */}
                    <div className="absolute bottom-4 left-4 right-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <LuxuryButton 
                        onClick={() => addToCart(product)}
                        className="w-full py-3 text-xs shadow-xl bg-white text-black hover:bg-luxury-primary hover:text-white border-none"
                      >
                        Add to Cart
                      </LuxuryButton>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl text-neutral-900 dark:text-white line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1 uppercase tracking-wide">{product.category}</p>
                  <p className="font-bold text-neutral-900 dark:text-white">₹{product.price}</p>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-20 text-neutral-500">
                No products found matching your criteria.
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Mobile View All */}
        <div className="mt-12 md:hidden flex justify-center">
          <LuxuryButton href="/shop" variant="outline" className="w-full">
            View All Products
          </LuxuryButton>
        </div>

      </div>
    </section>
  );
}
