"use client";
import { useState, useEffect } from "react";
import { Cookie } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check local storage to see if already accepted
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-96 z-[60] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl shadow-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full">
              <Cookie className="h-6 w-6 text-luxury-gold" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm mb-1">We use cookies</h4>
              <p className="text-xs text-neutral-500 mb-4">
                To ensure you get the most luxurious experience on our website.
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={acceptCookies}
                  className="flex-1 bg-black dark:bg-white text-white dark:text-black text-xs font-bold py-2.5 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Accept All
                </button>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="px-4 py-2.5 text-xs font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
