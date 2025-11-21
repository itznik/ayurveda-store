"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Plus, Minus, ChevronDown, Truck, Droplets, Leaf } from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types"; // Import the type

// --- REUSABLE ACCORDION ---
function Accordion({ title, icon: Icon, children }: { title: string; icon?: any; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200 dark:border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left group"
      >
        <div className="flex items-center gap-3">
            {Icon && <Icon className="w-5 h-5 text-luxury-primary/60 dark:text-white/60" />}
            <span className="font-serif text-lg text-luxury-dark dark:text-neutral-200 group-hover:text-luxury-primary transition-colors">
            {title}
            </span>
        </div>
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
            <div className="pb-6 pl-8 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ProductInfoProps {
    product: Product;
}

// --- MAIN COMPONENT ---
export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
    }
  };

  return (
    <div className="flex flex-col h-full justify-center">
      
      {/* Breadcrumbs / Category */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-luxury-primary dark:text-emerald-400">Shop</span>
        <span className="text-xs text-neutral-300">•</span>
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">{product.category}</span>
      </div>

      {/* Title */}
      <h1 className="font-serif text-4xl md:text-5xl text-luxury-dark dark:text-white mb-4 leading-tight">
        {product.name}
      </h1>
      
      {/* Price & Ratings */}
      <div className="flex items-center gap-4 mb-8">
        <p className="text-3xl font-bold text-luxury-dark dark:text-neutral-200">₹{product.price}</p>
        
        {/* Static Ratings for visual appeal (Backend doesn't have reviews yet) */}
        <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm font-bold text-neutral-900 dark:text-white ml-1">4.9</span>
        </div>
      </div>

      {/* Dynamic Description */}
      <div className="prose prose-neutral dark:prose-invert mb-10">
          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-lg">
            {product.description}
          </p>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12 border-b border-neutral-200 dark:border-white/10 pb-12">
        
        {/* Quantity Selector */}
        <div className="flex items-center justify-between bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl px-6 py-4 w-full sm:w-40">
          <button 
            onClick={() => setQuantity(Math.max(0, quantity - 1))} 
            className="hover:text-luxury-primary dark:hover:text-emerald-400 disabled:opacity-30 transition-colors"
            disabled={quantity <= 0}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="font-bold text-xl text-luxury-dark dark:text-white">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)} 
            className="hover:text-luxury-primary dark:hover:text-emerald-400 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Add Button */}
        <div className="flex-1">
          {quantity > 0 ? (
            <div onClick={handleAddToCart}>
              <LuxuryButton className="w-full rounded-2xl shadow-xl shadow-luxury-primary/20 py-4 text-base">
                Add to Ritual — ₹{(product.price * quantity).toFixed(2)}
              </LuxuryButton>
            </div>
          ) : (
            <button disabled className="w-full py-4 bg-neutral-100 dark:bg-white/5 text-neutral-400 font-bold rounded-2xl cursor-not-allowed tracking-[0.2em] text-xs uppercase border border-neutral-200 dark:border-white/10">
              Select Quantity
            </button>
          )}
        </div>
      </div>

      {/* Info Accordions (Static Content for now, matching the "Ayurvedic" theme) */}
      <div className="space-y-1">
        <Accordion title="The Ritual" icon={Droplets}>
            Apply 2-3 drops on damp skin after cleansing. Massage gently in upward circular motions until fully absorbed. Best used before bedtime for overnight rejuvenation.
        </Accordion>
        <Accordion title="Key Ingredients" icon={Leaf}>
            Pure Kashmiri Saffron (Crocus Sativus), Red Sandalwood (Pterocarpus Santalinus), Manjistha (Rubia Cordifolia), Goat Milk, Sesame Oil base.
        </Accordion>
        <Accordion title="Shipping & Returns" icon={Truck}>
            Free express shipping on all orders over ₹999. We accept returns of unopened products within 14 days of delivery.
        </Accordion>
      </div>

    </div>
  );
}
