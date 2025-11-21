"use client";

import { motion } from "framer-motion";

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Large Image - Soft Corners & Shadow */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-[#F0F2F0] dark:bg-[#0A1A15]"
      >
        <img
          src={images[0]}
          alt="Product View 1"
          className="h-full w-full object-cover"
        />
        
        {/* "Pure" Badge - Green Theme */}
        <div className="absolute top-6 left-6 bg-luxury-primary dark:bg-white px-4 py-1.5 rounded-full shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white dark:text-black">
            100% Ayurvedic
          </span>
        </div>
      </motion.div>

      {/* Secondary Images Grid */}
      <div className="grid grid-cols-2 gap-4">
        {images.slice(1).map((img, idx) => (
          <div key={idx} className="relative aspect-square overflow-hidden rounded-2xl bg-[#F0F2F0] dark:bg-[#0A1A15]">
            <img
              src={img}
              alt={`Product View ${idx + 2}`}
              className="h-full w-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
