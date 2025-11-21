import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";

// MOCK IMAGES
const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80"
];

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    // BACKGROUND: Soft Mist (Light) -> Deep Onyx (Dark)
    <main className="min-h-screen bg-[#F4F7F5] dark:bg-[#050505] transition-colors duration-500">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Column: Gallery (Sticky on Desktop) */}
          <div className="lg:sticky lg:top-32 h-fit">
            <ProductGallery images={MOCK_IMAGES} />
          </div>

          {/* Right Column: Info */}
          <div className="pt-4 lg:pt-8">
            <ProductInfo />
          </div>

        </div>
      </div>

      {/* 'You May Also Like' Section */}
      <section className="py-20 border-t border-neutral-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="font-serif text-3xl mb-4 text-luxury-dark dark:text-white">
              Complete Your Ritual
            </h3>
            <p className="text-neutral-500 mb-12">Pairs perfectly with these essentials.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {/* Placeholders for related products */}
               {[1,2,3,4].map((i) => (
                 <div key={i} className="aspect-[3/4] bg-white dark:bg-white/5 rounded-2xl"></div>
               ))}
            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
