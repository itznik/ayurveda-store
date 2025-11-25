"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    // Your Real Formspree Endpoint
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/xnnypnvk";

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSuccess(true);
        // Optional: Reset form logic here if needed
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to send message. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F4F7F5] dark:bg-[#050505] transition-colors duration-500 relative overflow-hidden">
      <Navbar />
      
      {/* --- LIVE AMBIENT BACKGROUND --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-luxury-sage/20 dark:bg-emerald-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-orange-100/30 dark:bg-teal-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000 opacity-60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        
        {/* HEADER TEXT */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-luxury-primary dark:text-emerald-400 mb-4 border border-luxury-primary/20 px-4 py-1.5 rounded-full backdrop-blur-sm"
          >
            We are here for you
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl text-luxury-dark dark:text-white mb-6 leading-tight"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed"
          >
            Whether you have a question about our rituals, ingredients, or your order, 
            our concierge team is ready to assist you on your wellness journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* --- LEFT: CONTACT INFO CARDS --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Card 1 */}
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/50 dark:border-white/5 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-5">
                <div className="p-3 bg-luxury-primary text-white rounded-2xl shadow-lg shadow-luxury-primary/30">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-luxury-dark dark:text-white mb-1">Call Us</h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-3">Mon-Fri from 8am to 5pm IST</p>
                  <a href="tel:+919876543210" className="text-lg font-bold text-luxury-dark dark:text-white hover:text-luxury-primary transition-colors">
                    +91 91730 04600
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/50 dark:border-white/5 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-5">
                <div className="p-3 bg-[#D4A373] text-white rounded-2xl shadow-lg shadow-[#D4A373]/30">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-luxury-dark dark:text-white mb-1">Email Us</h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-3">We typically reply within 2 hours</p>
                  <a href="mailto:wellixiraushadham@gmail.com" className="text-lg font-bold text-luxury-dark dark:text-white hover:text-luxury-primary transition-colors block">
                    wellixiraushadham@gmail.com
                  </a>
                  <a href="mailto:wellixiraushadham@gmail.com" className="text-sm font-medium text-neutral-400 hover:text-luxury-primary transition-colors block mt-1">
                    wellixiraushadham@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/50 dark:border-white/5 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-5">
                <div className="p-3 bg-neutral-800 dark:bg-neutral-700 text-white rounded-2xl shadow-lg">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-luxury-dark dark:text-white mb-1">Visit Us</h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-3">Experience our flagship sanctuary</p>
                  <p className="text-base font-bold text-luxury-dark dark:text-white leading-snug">
                    Aasha Nagar, <br />
                    Surat, India, 395004
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT: CONTACT FORM --- */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="bg-white dark:bg-[#0A1A15] p-8 md:p-10 rounded-[2rem] shadow-2xl border border-neutral-100 dark:border-white/5 relative overflow-hidden">
              
              {/* Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-primary/5 rounded-bl-[100px] pointer-events-none"></div>

              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
                      <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-serif text-3xl text-luxury-dark dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto mb-8">
                      Thank you for reaching out. Our team has received your message and will respond shortly.
                    </p>
                    <LuxuryButton onClick={() => setSuccess(false)} variant="outline">
                      Send Another Message
                    </LuxuryButton>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6 relative z-10"
                  >
                    <h3 className="font-serif text-2xl text-luxury-dark dark:text-white mb-6">Send a Message</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputGroup name="firstName" label="First Name" placeholder="Arya" required />
                      <InputGroup name="lastName" label="Last Name" placeholder="Vaidya" required />
                    </div>

                    <InputGroup name="email" label="Email Address" type="email" placeholder="name@example.com" required />
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 ml-1">
                        Subject
                      </label>
                      <select 
                        name="subject"
                        className="w-full px-5 py-4 bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-luxury-primary/50 dark:text-white text-sm font-medium appearance-none cursor-pointer"
                      >
                        <option>General Inquiry</option>
                        <option>Order Status</option>
                        <option>Product Consultation</option>
                        <option>Wholesale / Partnership</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 ml-1">
                        Message
                      </label>
                      <textarea 
                        name="message"
                        rows={5} 
                        required 
                        placeholder="How can we help you today?"
                        className="w-full px-5 py-4 bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-luxury-primary/50 dark:text-white text-sm font-medium placeholder-neutral-400 resize-none"
                      />
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
                        {error}
                      </div>
                    )}

                    <LuxuryButton 
                        type="submit" 
                        disabled={loading} 
                        className="w-full flex justify-center items-center gap-2 py-4 text-base shadow-xl shadow-luxury-primary/20"
                    >
                        {loading ? (
                          <Loader2 className="animate-spin h-5 w-5" />
                        ) : (
                          <>
                            Send Message <ArrowRight className="h-5 w-5" />
                          </>
                        )}
                    </LuxuryButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}

// --- HELPER COMPONENT ---
function InputGroup({ label, name, type = "text", placeholder, required }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 ml-1">
        {label}
      </label>
      <div className="relative group">
        {/* Add logic here if you want icons inside inputs in the future */}
        <input 
          type={type} 
          name={name}
          required={required}
          placeholder={placeholder}
          className="w-full px-5 py-4 bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-luxury-primary/50 dark:text-white text-sm font-medium placeholder-neutral-400 transition-all hover:bg-white dark:hover:bg-black/40" 
        />
      </div>
    </div>
  );
}
