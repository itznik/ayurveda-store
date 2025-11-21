"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";
import API from "@/lib/api";
import { Users, ShoppingCart, DollarSign, Activity, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { socket } = useSocket();
  const [loading, setLoading] = useState(true);
  
  // State for Dashboard Stats
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    revenue: 0,
  });

  // State for "Live Feed"
  const [activities, setActivities] = useState<string[]>([]);

  // 1. Fetch Initial Data from DB
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Orders to calculate Revenue & Count
        const { data: orders } = await API.get("/orders");
        
        const totalRevenue = orders.reduce((acc: number, order: any) => acc + (order.totalPrice || 0), 0);
        
        // Estimate users from unique orders (since we don't have a /users endpoint exposed yet)
        const uniqueCustomers = new Set(orders.map((o: any) => o.user?._id || o.user)).size;

        setStats({
            users: uniqueCustomers,
            orders: orders.length,
            revenue: totalRevenue
        });
      } catch (err) {
        console.error("Error fetching stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. REAL-TIME LISTENERS (The Magic)
  useEffect(() => {
    if (!socket) return;

    // Listen for New User
    socket.on("new_user_joined", (data: any) => {
      console.log("⚡ Real-Time User Joined:", data);
      
      // Update Count Instantly
      setStats((prev) => ({ ...prev, users: prev.users + 1 }));
      
      // Add to Notification Feed
      setActivities((prev) => [`🆕 New User Joined: ${data.name} (${data.email})`, ...prev]);
    });

    // Listen for New Order
    socket.on("new_order", (data: any) => {
      setStats((prev) => ({ 
          ...prev, 
          orders: prev.orders + 1,
          revenue: prev.revenue + data.totalPrice
      }));
      setActivities((prev) => [`💰 New Order Received: ₹${data.totalPrice}`, ...prev]);
    });

    return () => {
      socket.off("new_user_joined");
      socket.off("new_order");
    };
  }, [socket]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-10 w-10 animate-spin text-luxury-primary" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-luxury-dark dark:text-white mb-8">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
            icon={Users} 
            title="Total Customers" 
            value={stats.users} 
            color="bg-blue-500" 
        />
        <StatCard 
            icon={ShoppingCart} 
            title="Total Orders" 
            value={stats.orders} 
            color="bg-green-500" 
        />
        <StatCard 
            icon={DollarSign} 
            title="Total Revenue" 
            value={`₹${stats.revenue.toLocaleString()}`} 
            color="bg-[#d4a373]" 
        />
      </div>

      {/* Live Activity Feed */}
      <div className="bg-white dark:bg-[#0A1A15] rounded-2xl shadow-lg p-6 border border-neutral-200 dark:border-white/5">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-100 text-red-600 rounded-lg animate-pulse">
                <Activity size={20} />
            </div>
            <h2 className="text-xl font-bold text-luxury-dark dark:text-white">Live Activity Feed</h2>
        </div>

        <div className="space-y-4 h-64 overflow-y-auto custom-scrollbar">
            {activities.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-neutral-400 italic opacity-50">
                    <Activity className="h-8 w-8 mb-2" />
                    <p>Waiting for real-time events...</p>
                </div>
            ) : (
                activities.map((act, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 bg-neutral-50 dark:bg-white/5 rounded-xl border-l-4 border-luxury-primary text-neutral-700 dark:text-neutral-300 text-sm font-medium"
                    >
                        {act}
                    </motion.div>
                ))
            )}
        </div>
      </div>
    </div>
  );
}

// Simple Card Component
function StatCard({ icon: Icon, title, value, color }: any) {
  return (
    <div className="bg-white dark:bg-[#0A1A15] p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-white/5 flex items-center gap-4">
      <div className={`p-4 rounded-xl text-white shadow-lg ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-luxury-dark dark:text-white">{value}</h3>
      </div>
    </div>
  );
}
