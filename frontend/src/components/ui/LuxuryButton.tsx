"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import React from "react";

interface LuxuryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "gold";
  className?: string;
}

export function LuxuryButton({ 
  children, 
  href, 
  variant = "primary", 
  className,
  type = "button", // Default type
  disabled,
  onClick,
  ...props 
}: LuxuryButtonProps) {
  
  const baseStyles = cn(
    "relative group overflow-hidden px-8 py-3 transition-all duration-500 ease-out rounded-full font-medium tracking-widest text-xs uppercase",
    variant === "primary" && "bg-[#1a4d2e] text-white hover:shadow-[0_5px_15px_rgba(26,77,46,0.4)]",
    variant === "outline" && "border border-[#1a4d2e] text-[#1a4d2e] hover:bg-[#1a4d2e] hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black",
    variant === "gold" && "bg-[#d4a373] text-white hover:shadow-[0_5px_15px_rgba(212,163,115,0.4)]",
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  // If it's a Link
  if (href && !disabled) {
    return (
      <Link href={href} className={baseStyles}>
        <span className="relative z-10 flex items-center gap-2 justify-center">{children}</span>
        <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10" />
      </Link>
    );
  }

  // If it's a Button
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={baseStyles}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...(props as HTMLMotionProps<"button">)}
    >
      <span className="relative z-10 flex items-center gap-2 justify-center">{children}</span>
      <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10" />
    </motion.button>
  );
}
