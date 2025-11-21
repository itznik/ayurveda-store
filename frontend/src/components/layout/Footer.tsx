"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 pt-20 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-luxury-primary dark:text-white">AYURLUXE</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
              Merging ancient vedic wisdom with modern luxury to create a holistic lifestyle experience.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-neutral-900 dark:text-white">Shop</h4>
            <ul className="space-y-3 text-sm text-neutral-500 dark:text-neutral-400">
              <li>
                <Link href="/shop" className="hover:text-luxury-primary dark:hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-luxury-primary dark:hover:text-white transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-luxury-primary dark:hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-neutral-900 dark:text-white">Company</h4>
            <ul className="space-y-3 text-sm text-neutral-500 dark:text-neutral-400">
              <li>
                <Link href="/about" className="hover:text-luxury-primary dark:hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-luxury-primary dark:hover:text-white transition-colors">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-luxury-primary dark:hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-neutral-900 dark:text-white">Stay Connected</h4>
            <div className="flex gap-2 mb-6">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-neutral-100 dark:bg-neutral-900 border border-transparent focus:border-luxury-primary dark:focus:border-white rounded-lg px-4 py-2 text-sm focus:ring-0 outline-none transition-all"
              />
            </div>
            <div className="flex space-x-4">
              <Instagram className="h-5 w-5 text-neutral-400 hover:text-luxury-primary dark:hover:text-white cursor-pointer transition-colors" />
              <Facebook className="h-5 w-5 text-neutral-400 hover:text-luxury-primary dark:hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-neutral-400 hover:text-luxury-primary dark:hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 dark:text-neutral-400">
          <p>&copy; {currentYear} AyurLuxe. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-luxury-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-luxury-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
