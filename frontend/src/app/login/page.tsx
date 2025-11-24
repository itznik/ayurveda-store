"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import API from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle State

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await API.post("/users/login", { email, password });

      localStorage.setItem("userInfo", JSON.stringify(data));
      
      if (data.role === 'admin' || data.role === 'super_admin') {
          router.push("/admin/dashboard");
      } else {
          router.push("/");
      }
      
    } catch (err: any) {
      console.error("Login Error:", err);
      if (!err.response) {
        setError("Server is unreachable. Please try again later.");
      } else {
        setError(err.response.data.message || "Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar /> 
      
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#F4F7F5] dark:bg-[#050505] transition-colors duration-500 pt-20">
        
        {/* LIVE BACKGROUND */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] 
            bg-luxury-sage/30 dark:bg-emerald-900/20 
            rounded-full mix-blend-multiply dark:mix-blend-screen 
            filter blur-[100px] animate-blob opacity-70"></div>
          
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] 
            bg-orange-100/40 dark:bg-teal-900/20 
            rounded-full mix-blend-multiply dark:mix-blend-screen 
            filter blur-[100px] animate-blob animation-delay-2000 opacity-70"></div>
        </div>

        {/* CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md mx-4"
        >
          <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-2xl border border-white/60 dark:border-white/5 shadow-2xl rounded-3xl p-8 md:p-10">
            
            <div className="text-center mb-10">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-3">
                Welcome Back
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm tracking-wide">
                Continue your ayurvedic ritual
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-600 dark:text-red-400 text-sm rounded-r font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 ml-2">Email</label>
                <div className="relative group">
                  <div className="absolute left-5 top-4 text-neutral-400 group-focus-within:text-luxury-primary dark:group-focus-within:text-white transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input 
                    type="email" 
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 bg-white dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-luxury-primary/20 dark:focus:ring-emerald-500/20 focus:border-luxury-primary dark:focus:border-emerald-500 text-neutral-900 dark:text-white placeholder-neutral-400 transition-all font-medium shadow-sm"
                    required
                  />
                </div>
              </div>

              {/* Password Field with Eye Icon */}
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400">Password</label>
                  <Link href="#" className="text-xs font-semibold text-luxury-primary hover:text-black dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors">Forgot?</Link>
                </div>
                <div className="relative group">
                  <div className="absolute left-5 top-4 text-neutral-400 group-focus-within:text-luxury-primary dark:group-focus-within:text-white transition-colors">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} // Toggle Type
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-14 pr-12 py-4 bg-white dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-luxury-primary/20 dark:focus:ring-emerald-500/20 focus:border-luxury-primary dark:focus:border-emerald-500 text-neutral-900 dark:text-white placeholder-neutral-400 transition-all font-medium shadow-sm"
                    required
                  />
                  
                  {/* Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-4 text-neutral-400 hover:text-luxury-primary dark:hover:text-white transition-colors focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-luxury-primary dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold tracking-widest shadow-lg hover:shadow-xl hover:bg-luxury-dark dark:hover:bg-neutral-200 transition-all mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  <>
                    <span>SIGN IN</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                New here?{" "}
                <Link href="/register" className="font-bold text-neutral-900 dark:text-white hover:underline decoration-luxury-primary dark:decoration-white underline-offset-4">
                  Create Account
                </Link>
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </>
  );
}
