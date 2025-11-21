import Navbar from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";

export default function Home() {
  return (
    // REMOVED ALL BG CLASSES. It now listens to globals.css
    <main className="min-h-screen selection:bg-neutral-900 selection:text-white">
      <Navbar />
      <Hero />
      <FeaturedCollection />
      
      {/* Testimonials */}
      <section className="py-20 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-serif text-2xl mb-8">
            "The most authentic ayurvedic experience I've found online."
          </h3>
          <div className="flex items-center justify-center gap-4">
            <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-full"></div>
            <div className="text-left">
              <p className="font-bold text-sm">Sarah Jenkins</p>
              <p className="text-xs text-neutral-500">Verified Buyer</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <CookieConsent />
    </main>
  );
}
