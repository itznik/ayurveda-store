"use client";

import { Hero } from "@/components/home/Hero";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { CookieConsent } from "@/components/ui/CookieConsent";

export default function Home() {
  return (
    // REMOVED Navbar & Footer (They are now in layout.tsx)
    <main className="min-h-screen selection:bg-luxury-primary selection:text-white">
      
      <Hero />
      
      {/* This component now fetches Real Products from Backend */}
      <FeaturedCollection />
      
      {/* Static Testimonials Section */}
      <section className="py-20 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black transition-colors">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-serif text-2xl md:text-3xl mb-8 text-luxury-dark dark:text-white italic">
            "The most authentic ayurvedic experience I've found online. Truly transformative."
          </h3>
          <div className="flex items-center justify-center gap-4">
            {/* Placeholder Avatar */}
            <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
               <img src="https://i.pravatar.cc/150?img=5" alt="Sarah" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <p className="font-bold text-sm text-luxury-dark dark:text-white">Sarah Jenkins</p>
              <p className="text-xs text-luxury-primary uppercase tracking-wider">Verified Buyer</p>
            </div>
          </div>
        </div>
      </section>

      <CookieConsent />
    </main>
  );
}
