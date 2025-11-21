import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; // Import the master wrapper
import { CartDrawer } from "@/components/cart/CartDrawer";
import ConnectionStatus from "@/components/ConnectionStatus";
import Navbar from "@/components/layout/Navbar"; // Recommended: Add Navbar here
import { Footer } from "@/components/layout/Footer"; // Recommended: Add Footer here

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "AyurLuxe | Premium Ayurvedic Essentials",
  description: "Experience the essence of nature.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${playfair.variable} ${lato.variable} antialiased transition-colors duration-300 bg-white text-neutral-900 dark:bg-luxury-dark dark:text-white`}
      >
        {/* Master Provider wraps everything (Theme + Socket + Cart) */}
        <Providers>
            
            {/* 1. Connection Badge (Dev Only) */}
            <ConnectionStatus />

            {/* 2. Global Navigation */}
            <Navbar />

            {/* 3. Main Page Content */}
            <div className="min-h-screen pt-20"> {/* pt-20 prevents content hiding behind fixed navbar */}
               {children}
            </div>

            {/* 4. Global Footer */}
            <Footer />

            {/* 5. Cart Overlay (Hidden until toggled) */}
            <CartDrawer />

        </Providers>
      </body>
    </html>
  );
}
