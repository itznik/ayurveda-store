"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-black border-t border-neutral-200 dark:border-white/10 pt-20 pb-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Story */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <h3 className="font-serif text-2xl font-bold tracking-wider text-luxury-dark dark:text-white">
                WELLIXIR
              </h3>
            </Link>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-xs">
              Merging ancient Vedic wisdom with modern luxury to create a holistic lifestyle experience for the conscious soul.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              <SocialLink href="#" icon={<Instagram className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Facebook className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Twitter className="h-5 w-5" />} />
              <SocialLink href="mailto:namaste@ayurluxe.com" icon={<Mail className="h-5 w-5" />} />
            </div>
          </div>

          {/* Column 2: Shop & Explore */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-luxury-dark dark:text-white">
              Explore
            </h4>
            <ul className="space-y-4 text-sm text-neutral-500 dark:text-neutral-400">
              <FooterLink href="/shop">All Products</FooterLink>
              <FooterLink href="/shop?category=Face%20Oils">Face Oils</FooterLink>
              <FooterLink href="/shop?category=Hair%20Care">Hair Care</FooterLink>
              <FooterLink href="/shop?category=Wellness">Wellness Sets</FooterLink>
              <FooterLink href="/journal">The Journal</FooterLink>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-luxury-dark dark:text-white">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-neutral-500 dark:text-neutral-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-luxury-primary shrink-0 mt-0.5" />
                <span>123 Wellness Avenue,<br />Himalayan Foothills, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-luxury-primary shrink-0" />
                <a href="tel:+919876543210" className="hover:text-luxury-primary transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-luxury-primary shrink-0" />
                <a href="mailto:namaste@ayurluxe.com" className="hover:text-luxury-primary transition-colors">namaste@ayurluxe.com</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-luxury-dark dark:text-white">
              Stay Connected
            </h4>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4">
              Join our newsletter for exclusive rituals, wellness tips, and early access to new drops.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-luxury-primary dark:focus:border-emerald-500 transition-colors text-luxury-dark dark:text-white placeholder-neutral-400"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 p-1.5 bg-luxury-primary text-white rounded-lg hover:bg-luxury-dark transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <span className="text-[10px] text-neutral-400">
                By subscribing, you agree to our Privacy Policy.
              </span>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <p>&copy; {currentYear} AyurLuxe. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/about" className="hover:text-luxury-primary transition-colors">About Us</Link>
            <Link href="/privacy" className="hover:text-luxury-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-luxury-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- HELPER COMPONENTS ---

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="hover:text-luxury-primary dark:hover:text-white transition-colors relative group inline-block"
      >
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-px bg-luxury-primary transition-all duration-300 group-hover:w-full"></span>
      </Link>
    </li>
  );
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="p-2 rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:bg-luxury-primary hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
    >
      {icon}
    </a>
  );
}
