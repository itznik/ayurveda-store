"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      
      {/* Background with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=2080&auto=format&fit=crop')" }}
        />
        {/* Darker Green Overlay for better text readability */}
        <div className="absolute inset-0 bg-luxury-dark/40 dark:bg-luxury-dark/60 backdrop-blur-[2px]" />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="block text-xs md:text-sm uppercase tracking-[0.4em] text-luxury-sage mb-6 border border-luxury-sage/30 inline-block px-4 py-2 rounded-full backdrop-blur-md">
            Est. 2024 • Authentic Ayurveda
          </span>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight drop-shadow-2xl">
            Rediscover <br /> 
            {/* CHANGED: Gold -> Sage Green */}
            <span className="italic text-luxury-sage">Nature's</span> Essence
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            
            {/* CHANGED: Button variant 'gold' -> 'primary' (Hunter Green) */}
            <LuxuryButton href="/shop" variant="primary" className="min-w-[220px] shadow-xl shadow-luxury-dark/50">
              Shop Collection <ArrowRight className="h-4 w-4" />
            </LuxuryButton>

            <LuxuryButton href="/about" variant="outline" className="min-w-[220px] border-white text-white hover:text-luxury-dark dark:hover:text-luxury-dark hover:bg-white">
              Our Story
            </LuxuryButton>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
