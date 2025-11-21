"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Lock, User, Phone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      
      {/* BACKGROUND: Matches Login Page */}
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#F4F7F5] dark:bg-[#050505] transition-colors duration-500 pt-20 pb-10">
        
        {/* Ambient Glow */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-luxury-sage/30 dark:bg-emerald-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob opacity-70"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-100/40 dark:bg-teal-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000 opacity-70"></div>
        </div>

        {/* CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-lg mx-4"
        >
          <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-2xl border border-white/60 dark:border-white/5 shadow-2xl rounded-3xl p-8 md:p-10">
            
            <div className="text-center mb-8">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-3">
                Begin Your Journey
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm tracking-wide">
                Join AyurLuxe for exclusive rewards & rituals.
              </p>
            </div>

            <form className="space-y-5">
              
              {/* Name Fields (Split) */}
              <div className="grid grid-cols-2 gap-4">
                <InputGroup label="First Name" icon={<User />} placeholder="Arya" />
                <InputGroup label="Last Name" icon={<User />} placeholder="Vaidya" />
              </div>

              <InputGroup label="Email" icon={<Mail />} placeholder="name@example.com" type="email" />
              <InputGroup label="Phone (Optional)" icon={<Phone />} placeholder="+91 98765..." type="tel" />
              <InputGroup label="Password" icon={<Lock />} placeholder="••••••••" type="password" />
              
              {/* Terms Checkbox */}
              <div className="flex items-center gap-3 pt-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="w-5 h-5 accent-luxury-primary rounded border-gray-300"
                />
                <label htmlFor="terms" className="text-xs text-neutral-500 dark:text-neutral-400 leading-tight">
                  I agree to the <Link href="#" className="underline decoration-dotted">Terms of Service</Link> and <Link href="#" className="underline decoration-dotted">Privacy Policy</Link>.
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center space-x-2 bg-luxury-primary dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold tracking-widest shadow-lg hover:shadow-xl hover:bg-luxury-dark dark:hover:bg-neutral-200 transition-all mt-6"
              >
                <span>CREATE ACCOUNT</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                Already have an account?{" "}
                <Link href="/login" className="font-bold text-neutral-900 dark:text-white hover:underline decoration-luxury-primary dark:decoration-white underline-offset-4">
                  Sign In
                </Link>
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </>
  );
}

// Helper Component for Clean Inputs
function InputGroup({ label, icon, placeholder, type = "text" }: { label: string, icon: any, placeholder: string, type?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 ml-2">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-5 top-4 text-neutral-400 group-focus-within:text-luxury-primary dark:group-focus-within:text-white transition-colors">
          {React.cloneElement(icon, { className: "h-5 w-5" })}
        </div>
        <input 
          type={type}
          placeholder={placeholder}
          className="w-full pl-14 pr-6 py-4 bg-white dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-luxury-primary/20 dark:focus:ring-emerald-500/20 focus:border-luxury-primary dark:focus:border-emerald-500 text-neutral-900 dark:text-white placeholder-neutral-400 transition-all font-medium shadow-sm"
        />
      </div>
    </div>
  );
}

import React from "react";
