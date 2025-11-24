"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/app/providers"; // Import our MANUAL hook

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors z-50"
      aria-label="Toggle Theme"
    >
      {/* Sun Icon (Shows when Dark) */}
      <motion.div
        initial={false}
        animate={{ 
          scale: isDark ? 1 : 0,
          rotate: isDark ? 0 : 180,
          opacity: isDark ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="h-5 w-5 text-white" />
      </motion.div>

      {/* Moon Icon (Shows when Light) */}
      <motion.div
        initial={false}
        animate={{ 
          scale: isDark ? 0 : 1,
          rotate: isDark ? -180 : 0,
          opacity: isDark ? 0 : 1
        }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center"
      >
        <Moon className="h-5 w-5 text-neutral-900" />
      </motion.div>
    </button>
  );
}
