"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    closeCart(); 
    setTimeout(() => {
      router.push("/checkout");
    }, 300); 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* DRAWER PANEL */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#F4F7F5] dark:bg-[#0A1A15] shadow-2xl z-[101] flex flex-col border-l border-neutral-200 dark:border-neutral-800"
          >
            {/* HEADER */}
            <div className="p-6 flex items-center justify-between border-b border-neutral-200 dark:border-white/10">
              <h2 className="font-serif text-2xl text-luxury-dark dark:text-white">Your Ritual</h2>
              <button onClick={closeCart} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
                <X className="h-6 w-6 text-neutral-500 dark:text-neutral-400" />
              </button>
            </div>

            {/* ITEMS LIST */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                  <div className="w-16 h-16 rounded-full bg-neutral-200 dark:bg-white/5 flex items-center justify-center">
                    <ShoppingBagIcon className="h-8 w-8 text-neutral-400" />
                  </div>
                  <p className="text-neutral-500 dark:text-neutral-400">Your cart is empty.</p>
                  <button onClick={closeCart} className="text-luxury-primary font-bold text-sm underline">Start Shopping</button>
                </div>
              ) : (
                items.map((item) => (
                  // FIX: Use item._id for Key
                  <motion.div layout key={item._id} className="flex gap-4 bg-white dark:bg-white/5 p-3 rounded-2xl border border-neutral-100 dark:border-white/5">
                    {/* Image */}
                    <div className="relative w-20 h-24 flex-shrink-0 bg-neutral-100 rounded-xl overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-neutral-900 dark:text-white line-clamp-1">{item.name}</h4>
                          {/* FIX: Use item._id for Remove */}
                          <button onClick={() => removeFromCart(item._id)} className="text-neutral-400 hover:text-red-500 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider">{item.category}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-neutral-100 dark:bg-black/30 rounded-lg px-2 py-1">
                          {/* FIX: Use item._id for Update */}
                          <button onClick={() => updateQuantity(item._id, -1)} className="p-1 hover:text-luxury-primary dark:text-white">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center dark:text-white">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item._id, 1)} className="p-1 hover:text-luxury-primary dark:text-white">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        {/* FIX: Updated to ₹ Symbol */}
                        <p className="font-bold text-neutral-900 dark:text-white">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* FOOTER */}
            {items.length > 0 && (
              <div className="p-6 bg-white dark:bg-black/20 border-t border-neutral-200 dark:border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">Subtotal</span>
                  <span className="font-serif text-xl font-bold text-luxury-dark dark:text-white">₹{cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-neutral-400 text-center">Shipping & taxes calculated at checkout</p>
                
                <div onClick={handleCheckout}>
                  <LuxuryButton 
                    className="w-full shadow-lg shadow-luxury-primary/20"
                  >
                    Checkout <ArrowRight className="h-4 w-4" />
                  </LuxuryButton>
                </div>
              
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ShoppingBagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}
