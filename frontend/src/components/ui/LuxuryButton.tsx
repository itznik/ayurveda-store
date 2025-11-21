"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline"; // Removed 'gold' type to force strict green theme
  href?: string;
  children: React.ReactNode;
}

export function LuxuryButton({ className, variant = "primary", href, children, ...props }: ButtonProps) {
  const isPrimary = variant === "primary";

  const baseStyles = cn(
    "relative group overflow-hidden px-8 py-4 text-xs md:text-sm uppercase tracking-[0.2em] font-bold transition-all duration-500 flex items-center justify-center rounded-sm",
    
    // PRIMARY: Hunter Green (Light Mode) / Sage (Dark Mode)
    // This creates excellent contrast in both modes
    isPrimary && "bg-luxury-primary text-white dark:bg-luxury-sage dark:text-luxury-dark border border-transparent",
    
    // OUTLINE: Green Borders
    variant === "outline" && "border border-luxury-primary text-luxury-primary dark:border-luxury-sage dark:text-luxury-sage hover:text-white dark:hover:text-luxury-dark",
    
    className
  );

  // Sliding Background Logic (The "Fill" animation)
  const slideBg = cn(
    "absolute inset-0 w-full h-full transition-transform duration-500 ease-out transform translate-y-full group-hover:translate-y-0",
    // Hovering always fills with the Deepest Green for a premium feel
    "bg-luxury-dark dark:bg-luxury-cream" 
  );

  const content = (
    <>
      <div className={slideBg} />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return <Link href={href} className={baseStyles}>{content}</Link>;
  }

  return (
    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={baseStyles} {...props}>
      {content}
    </motion.button>
  );
}
