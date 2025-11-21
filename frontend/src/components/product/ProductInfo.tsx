"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Plus, Minus, ChevronDown } from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { useCart } from "@/context/CartContext";

// --- REUSABLE ACCORDION ---
function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200 dark:border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left group"
      >
        <span className="font-serif text-lg text-luxury-dark dark:text-neutral-200 group-hover:text-luxury-primary transition-colors">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-5 w-5 text-neutral-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- MAIN COMPONENT ---
export function ProductInfo() {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Mock Data
  const product = {
    id: 99,
    name: "Kumkumadi Tailam",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&w=800&q=80",
    category: "Face Oil"
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({ ...product, price: product.price }, quantity);
    }
  };

  return (
    <div className="flex flex-col h-full justify-center">
      
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-luxury-primary dark:text-emerald-400">Face Care</span>
        <span className="text-xs text-neutral-300">•</span>
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Oils</span>
      </div>

      <h1 className="font-serif text-4xl md:text-5xl text-luxury-dark dark:text-white mb-4 leading-tight">
        {product.name}
      </h1>
      
      <div className="flex items-center gap-4 mb-8">
        <p className="text-2xl font-bold text-luxury-dark dark:text-neutral-200">${product.price.toFixed(2)}</p>
        <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-500">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm font-bold text-neutral-900 dark:text-white ml-1">4.9</span>
          <span className="text-sm text-neutral-400 underline decoration-dotted ml-1">(128 Reviews)</span>
        </div>
      </div>

      <p className="text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed">
        A miraculous beauty fluid composed of 100% pure Kashmiri Saffron.
      </p>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        
        {/* Quantity Selector (Updated to allow 0) */}
        <div className="flex items-center justify-between bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl px-6 py-4 w-full sm:w-40">
          <button 
            // FIX: Allowed going to 0
            onClick={() => setQuantity(Math.max(0, quantity - 1))} 
            className="hover:text-luxury-primary dark:hover:text-emerald-400 disabled:opacity-30"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="font-bold text-luxury-dark dark:text-white">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)} 
            className="hover:text-luxury-primary dark:hover:text-emerald-400"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Add Button - Logic to disable if 0 */}
        <div className="flex-1">
          {quantity > 0 ? (
            <div onClick={handleAddToCart}>
              <LuxuryButton className="w-full rounded-2xl shadow-xl shadow-luxury-primary/20">
                Add to Ritual
              </LuxuryButton>
            </div>
          ) : (
            <button disabled className="w-full py-4 bg-neutral-200 dark:bg-white/10 text-neutral-400 font-bold rounded-2xl cursor-not-allowed tracking-[0.2em] text-xs uppercase">
              Select Quantity
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Accordion title="The Ritual">Apply 2-3 drops on damp skin after cleansing.</Accordion>
        <Accordion title="Ingredients">Kashmiri Saffron, Sandalwood, Lotus Pollen.</Accordion>
        <Accordion title="Shipping">Free worldwide shipping on orders over $100.</Accordion>
      </div>

    </div>
  );
}
