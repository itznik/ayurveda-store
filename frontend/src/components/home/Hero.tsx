"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { ArrowRight } from "lucide-react";
import API from "@/lib/api";

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  // 1. State for Dynamic Content (with Default Fallbacks)
  const [content, setContent] = useState({
    title: "Rediscover Nature's Essence",
    subtitle: "Est. 2024 • Authentic Ayurveda"
  });
  const [loading, setLoading] = useState(true);

  // 2. Fetch Settings from Backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await API.get("/settings");
        if (data) {
            // Only update if data exists
            setContent({
                title: data.heroTitle || "Rediscover Nature's Essence",
                subtitle: data.heroSubtitle || "Est. 2024 • Authentic Ayurveda" // Using the schema field we created earlier
            });
        }
      } catch (error) {
        console.error("Failed to load hero settings, using defaults.");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      
      {/* Background with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://i.postimg.cc/V6ZLMDVq/wellixir-aushadham-14040904-022701705.webp')" }}
        />
        <div className="absolute inset-0 bg-luxury-dark/40 dark:bg-luxury-dark/60 backdrop-blur-[2px]" />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Dynamic Subtitle */}
          <span className="block text-xs md:text-sm uppercase tracking-[0.4em] text-luxury-sage mb-6 border border-luxury-sage/30 inline-block px-4 py-2 rounded-full backdrop-blur-md transition-opacity duration-500">
            {loading ? <span className="opacity-0">Loading...</span> : content.subtitle}
          </span>
          
          {/* Dynamic Title */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight drop-shadow-2xl transition-opacity duration-500">
            {loading ? (
               <span className="opacity-50 blur-sm">Rediscover Nature</span>
            ) : (
               // We render the title directly. If you want partial coloring (like "Nature's" in green),
               // you would need to add advanced text parsing logic here.
               // For now, we keep it clean so the Admin text displays exactly as typed.
               content.title
            )}
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            
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
