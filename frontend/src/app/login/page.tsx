"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Lock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function LoginPage() {
  return (
    <>
      <Navbar /> 
      
      {/* CONTAINER: 
          Light Mode: Very pale Sage (#F4F7F5)
          Dark Mode:  Deep Onyx (#050505) - No more muddy green background
      */}
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#F4F7F5] dark:bg-[#050505] transition-colors duration-500">
        
        {/* --- LIVE BACKGROUND (Subtle & Premium) --- */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Top Left: Soft Sage (Light) / Deep Emerald (Dark) */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] 
            bg-luxury-sage/30 dark:bg-emerald-900/20 
            rounded-full mix-blend-multiply dark:mix-blend-screen 
            filter blur-[100px] animate-blob opacity-70"></div>
          
          {/* Bottom Right: Gold/Tea (Light) / Mint (Dark) */}
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] 
            bg-orange-100/40 dark:bg-teal-900/20 
            rounded-full mix-blend-multiply dark:mix-blend-screen 
            filter blur-[100px] animate-blob animation-delay-2000 opacity-70"></div>
        </div>

        {/* --- CARD --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md mx-4"
        >
          {/* GLASS CONTAINER
             - rounded-3xl: MUCH softer corners
             - dark:bg-neutral-900/80: Dark gray glass instead of green glass
          */}
          <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-2xl border border-white/60 dark:border-white/5 shadow-2xl rounded-3xl p-8 md:p-10">
            
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-3">
                Welcome Back
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm tracking-wide">
                Continue your ayurvedic ritual
              </p>
            </div>

            {/* Login Form */}
            <form className="space-y-5">
              
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 ml-2">Email</label>
                <div className="relative group">
                  <div className="absolute left-5 top-4 text-neutral-400 group-focus-within:text-luxury-primary dark:group-focus-within:text-white transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input 
                    type="email" 
                    placeholder="name@example.com"
                    // ROUNDED-2XL for soft inputs
                    className="w-full pl-14 pr-6 py-4 bg-white dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-luxury-primary/20 dark:focus:ring-emerald-500/20 focus:border-luxury-primary dark:focus:border-emerald-500 text-neutral-900 dark:text-white placeholder-neutral-400 transition-all font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400">Password</label>
                  <Link href="#" className="text-xs font-semibold text-luxury-primary hover:text-black dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors">Forgot?</Link>
                </div>
                <div className="relative group">
                  <div className="absolute left-5 top-4 text-neutral-400 group-focus-within:text-luxury-primary dark:group-focus-within:text-white transition-colors">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full pl-14 pr-6 py-4 bg-white dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-luxury-primary/20 dark:focus:ring-emerald-500/20 focus:border-luxury-primary dark:focus:border-emerald-500 text-neutral-900 dark:text-white placeholder-neutral-400 transition-all font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                // ROUNDED-2XL for soft button
                className="w-full flex items-center justify-center space-x-2 bg-luxury-primary dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold tracking-widest shadow-lg hover:shadow-xl hover:bg-luxury-dark dark:hover:bg-neutral-200 transition-all mt-6"
              >
                <span>SIGN IN</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                New here?{" "}
                <Link href="/register" className="font-bold text-neutral-900 dark:text-white hover:underline decoration-luxury-primary dark:decoration-white underline-offset-4">
                  Create Account
                </Link>
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </>
  );
}
