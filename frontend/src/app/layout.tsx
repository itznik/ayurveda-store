import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; // Import from your providers file
import { CartDrawer } from "@/components/cart/CartDrawer";
import ConnectionStatus from "@/components/ConnectionStatus";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
        {/* CRITICAL FIX: 
           <Providers> must be the topmost parent.
           Navbar, CartDrawer, and Children must ALL be inside it.
        */}
        <Providers>
            
            <ConnectionStatus />
            
            <Navbar /> {/* Now inside CartProvider via Providers */}

            <div className="min-h-screen pt-20">
               {children}
            </div>

            <Footer />

            <CartDrawer />

        </Providers>
      </body>
    </html>
  );
}
