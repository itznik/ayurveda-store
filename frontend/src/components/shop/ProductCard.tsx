"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext"; // Import the hook

interface Product {
  id: string | number;
  name: string;
  category: string;
  price: string;
  image: string;
  isNew?: boolean;
}

export function ProductCard({ product }: { product: Product }) {
  // 1. Get the addToCart function from our Context
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      {/* IMAGE CONTAINER - Links to Product Detail */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 mb-5 cursor-pointer">
          
          {/* Badge */}
          {product.isNew && (
            <div className="absolute top-3 left-3 z-20 bg-luxury-primary dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              New Arrival
            </div>
          )}

          {/* Image with Zoom Effect */}
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Dark Overlay on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      </Link>

      {/* INFO SECTION */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-500 mb-1">
            {product.category}
          </p>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-serif text-xl text-neutral-900 dark:text-white group-hover:text-luxury-primary dark:group-hover:text-emerald-400 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm font-medium text-neutral-900 dark:text-white mt-1">
            {product.price}
          </p>
        </div>

        {/* Floating Add Button (Logic Connected Here) */}
        <button 
          onClick={() => addToCart(product)}
          className="p-3 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-luxury-primary hover:border-luxury-primary hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 group-hover:scale-110"
          aria-label="Add to cart"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
}
