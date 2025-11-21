import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";

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
    <html lang="en">
      <body 
        className={`${playfair.variable} ${lato.variable} antialiased transition-colors duration-300 bg-white text-neutral-900 dark:bg-luxury-dark dark:text-white`}
      >
        <ThemeProvider>
          <CartProvider>
            {children}
            <CartDrawer /> {/* The Drawer sits here, hidden until opened */}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
