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
      // Delay showing the banner slightly for better UX
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
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-96 z-[60] bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl shadow-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-neutral-50 dark:bg-white/5 rounded-full">
              {/* Updated Color to match your Gold Theme (#d4a373) */}
              <Cookie className="h-6 w-6 text-[#d4a373]" />
            </div>
            <div className="flex-1">
              <h4 className="font-serif font-bold text-neutral-900 dark:text-white text-base mb-1">
                Our Ritual
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4 leading-relaxed">
                We use cookies to enhance your journey and ensure you get the most luxurious experience on our website.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={acceptCookies}
                  className="flex-1 bg-[#1a4d2e] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#143d24] transition-colors shadow-lg"
                >
                  Accept
                </button>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="px-4 py-2.5 text-xs font-bold text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
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
