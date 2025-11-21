"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import API from "@/lib/api";
import { Product } from "@/types";

// Components
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductCard from "@/components/shop/ProductCard";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id; // Get ID from URL

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch the Main Product
        const { data: productData } = await API.get(`/products/${id}`);
        setProduct(productData);

        // 2. Fetch "Related" Products (For now, just fetching list and excluding current)
        const { data: allProducts } = await API.get("/products");
        const related = allProducts
          .filter((p: Product) => p._id !== id) // Don't show the same product again
          .slice(0, 4); // Take 4 items
        setRelatedProducts(related);

      } catch (error) {
        console.error("Failed to load product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7F5] dark:bg-[#050505]">
        <Loader2 className="w-10 h-10 animate-spin text-luxury-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7F5] dark:bg-[#050505]">
        <p className="text-neutral-500">Product not found.</p>
      </div>
    );
  }

  return (
    // BACKGROUND: Soft Mist (Light) -> Deep Onyx (Dark)
    <main className="min-h-screen bg-[#F4F7F5] dark:bg-[#050505] transition-colors duration-500">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Column: Gallery (Sticky on Desktop) */}
          <div className="lg:sticky lg:top-32 h-fit">
            {/* Backend sends single 'image' string, Gallery expects array. We wrap it. */}
            <ProductGallery images={[product.image]} />
          </div>

          {/* Right Column: Info */}
          <div className="pt-4 lg:pt-8">
            <ProductInfo product={product} />
          </div>

        </div>
      </div>

      {/* 'You May Also Like' Section */}
      {relatedProducts.length > 0 && (
        <section className="py-20 border-t border-neutral-200 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                <h3 className="font-serif text-3xl mb-4 text-luxury-dark dark:text-white">
                  Complete Your Ritual
                </h3>
                <p className="text-neutral-500">Pairs perfectly with these essentials.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                 {relatedProducts.map((related) => (
                   <ProductCard key={related._id} product={related} />
                 ))}
              </div>
          </div>
        </section>
      )}

    </main>
  );
}
