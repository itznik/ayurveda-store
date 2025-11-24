"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Lock, ArrowLeft, CreditCard, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useCart } from "@/context/CartContext";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import API from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, cartTotal, items: cartItems } = useCart(); 
  const [isClient, setIsClient] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // eslint-disable-line @typescript-eslint/no-unused-vars

  // Form State
  const [form, setForm] = useState({
    address: "", city: "", postalCode: "", country: "India", paymentMethod: "Card"
  });

  useEffect(() => { setIsClient(true); }, []);

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
        // 1. Construct Order Data for Backend
        const orderData = {
            orderItems: cartItems.map(item => ({
                product: item._id, // Send ID
                name: item.name,
                qty: item.quantity,
                image: item.image,
                price: item.price
            })),
            shippingAddress: {
                address: form.address,
                city: form.city,
                postalCode: form.postalCode,
                country: form.country
            },
            paymentMethod: "Card",
            itemsPrice: cartTotal,
            shippingPrice: 0,
            taxPrice: 0,
            totalPrice: cartTotal
        };

        // 2. Send to Backend
        await API.post("/orders", orderData);

        // 3. Success
        setStep(2);

    } catch (error) {
        console.error("Order Failed", error);
        alert("Failed to place order. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  if (!isClient) return null;

  // EMPTY CART STATE
  if (items.length === 0 && step === 1) {
    return (
      <div className="min-h-screen bg-[#F4F7F5] dark:bg-[#050505] flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-serif text-3xl text-luxury-dark dark:text-white mb-4">Your cart is empty.</h2>
        <Link href="/shop">
          <LuxuryButton variant="primary">Return to Shop</LuxuryButton>
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F7F5] dark:bg-[#050505] transition-colors duration-500">
      <Navbar />

      {/* TOP BAR (Secure) */}
      <div className="pt-24 pb-8 px-4 border-b border-neutral-200 dark:border-white/5 bg-white/50 dark:bg-black/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/shop" className="flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-luxury-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Continue Shopping
          </Link>
          <div className="flex items-center gap-2 text-luxury-primary dark:text-emerald-400">
            <Lock className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* --- LEFT COLUMN: FORMS --- */}
        <div className="lg:col-span-7 space-y-8">
          {step === 1 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* SECTION 1: SHIPPING */}
              <div className="bg-white dark:bg-white/5 p-8 rounded-3xl shadow-sm border border-neutral-100 dark:border-white/5">
                <h3 className="font-serif text-2xl text-luxury-dark dark:text-white mb-6">Shipping Address</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    placeholder="Address" 
                    className="col-span-2" 
                    onChange={(e) => setForm({...form, address: e.target.value})} 
                  />
                  <Input 
                    placeholder="City" 
                    onChange={(e) => setForm({...form, city: e.target.value})} 
                  />
                  <Input 
                    placeholder="Postal Code" 
                    onChange={(e) => setForm({...form, postalCode: e.target.value})} 
                  />
                  <Input 
                    placeholder="Country" 
                    value="India" 
                    readOnly 
                    className="col-span-2 bg-gray-100 dark:bg-white/10 cursor-not-allowed" 
                  />
                </div>
              </div>

              {/* SECTION 2: PAYMENT */}
              <div className="bg-white dark:bg-white/5 p-8 rounded-3xl shadow-sm border border-neutral-100 dark:border-white/5">
                <h3 className="font-serif text-2xl text-luxury-dark dark:text-white mb-6">Payment</h3>
                <p className="text-sm text-neutral-500 mb-4">All transactions are secure and encrypted.</p>
                
                <div className="border border-neutral-200 dark:border-white/10 rounded-2xl overflow-hidden">
                  <div className="bg-neutral-50 dark:bg-white/5 p-4 flex items-center justify-between border-b border-neutral-200 dark:border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-4 border-luxury-primary"></div>
                      <span className="font-bold text-sm text-luxury-dark dark:text-white">Credit Card</span>
                    </div>
                    <div className="flex gap-2">
                      <CreditCard className="h-5 w-5 text-neutral-400" />
                    </div>
                  </div>
                  
                  <div className="p-6 grid grid-cols-1 gap-4 bg-neutral-50/50 dark:bg-black/20">
                    <Input placeholder="Card Number" icon={<Lock className="w-4 h-4" />} />
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Expiration (MM / YY)" />
                      <Input placeholder="CVV" />
                    </div>
                  </div>
                </div>
              </div>

              {/* PAY BUTTON */}
              <div onClick={!loading ? handlePlaceOrder : undefined}>
                <LuxuryButton className="w-full py-5 rounded-2xl text-lg shadow-xl shadow-luxury-primary/20 flex justify-center items-center gap-2">
                  {loading ? <Loader2 className="animate-spin h-5 w-5" /> : `Pay ₹${cartTotal.toFixed(2)}`}
                </LuxuryButton>
              </div>

            </motion.div>
          ) : (
            // SUCCESS STATE
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-white/5 p-12 rounded-3xl text-center border border-neutral-100 dark:border-white/5"
            >
              <div className="w-20 h-20 bg-luxury-primary/10 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-luxury-primary dark:text-emerald-400" />
              </div>
              <h2 className="font-serif text-4xl text-luxury-dark dark:text-white mb-4">Order Confirmed</h2>
              <p className="text-neutral-500 mb-8 max-w-md mx-auto">
                Thank you for your purchase. Your ritual will begin shortly.
              </p>
              <Link href="/account">
                <LuxuryButton variant="outline">View Order</LuxuryButton>
              </Link>
            </motion.div>
          )}
        </div>

        {/* --- RIGHT COLUMN: ORDER SUMMARY --- */}
        <div className="lg:col-span-5">
          <div className="sticky top-32 space-y-6">
            <div className="bg-white dark:bg-white/5 p-8 rounded-3xl shadow-lg border border-neutral-100 dark:border-white/5">
              <h3 className="font-serif text-xl text-luxury-dark dark:text-white mb-6">Your Ritual</h3>
              
              <div className="space-y-4 mb-8 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item._id} className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute top-0 right-0 bg-neutral-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-bl-lg">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif text-sm text-luxury-dark dark:text-white">{item.name}</h4>
                      <p className="text-xs text-neutral-500">{item.category}</p>
                    </div>
                    <p className="font-bold text-sm text-luxury-dark dark:text-white">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-neutral-200 dark:border-white/10">
                <div className="flex justify-between text-sm text-neutral-500">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-500">
                  <span>Shipping</span>
                  <span className="text-luxury-primary font-bold">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-luxury-dark dark:text-white pt-4">
                  <span>Total</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

// --- Helper Input Component ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

function Input({ className, icon, ...props }: InputProps) {
  return (
    <div className={`relative group ${className}`}>
      <input 
        {...props}
        className={`w-full px-5 py-4 bg-neutral-50 dark:bg-black/30 border border-neutral-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-luxury-primary/20 dark:focus:ring-emerald-500/20 focus:border-luxury-primary dark:focus:border-emerald-500 transition-all text-luxury-dark dark:text-white placeholder-neutral-400 text-sm font-medium ${props.readOnly ? 'cursor-not-allowed opacity-70' : ''}`}
      />
      {icon && (
        <div className="absolute right-4 top-4 text-neutral-400">
          {icon}
        </div>
      )}
    </div>
  );
}
