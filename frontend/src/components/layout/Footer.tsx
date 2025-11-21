import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold">AYURLUXE</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Merging ancient vedic wisdom with modern luxury to create a holistic lifestyle experience.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6">Shop</h4>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">New Arrivals</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Journal</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6">Stay Connected</h4>
            <div className="flex gap-2 mb-6">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-neutral-100 dark:bg-neutral-900 border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-black dark:focus:ring-white"
              />
            </div>
            <div className="flex space-x-4">
              <Instagram className="h-5 w-5 text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer" />
              <Facebook className="h-5 w-5 text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 dark:border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
          <p>&copy; 2024 AyurLuxe. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
