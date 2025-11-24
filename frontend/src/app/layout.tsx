import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; 
import { CartDrawer } from "@/components/cart/CartDrawer";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import ConnectionStatus from "@/components/ConnectionStatus";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "WELLIXIR | Premium Ayurvedic Essentials",
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
        {/* THE FIX: Everything is wrapped in Providers first */}
        <Providers>
            
            <ConnectionStatus />
            
            {/* Navbar is now safe because it's inside Providers */}
            <Navbar /> 

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
