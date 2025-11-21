"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";
import API from "@/lib/api";
import { Users, ShoppingCart, DollarSign, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { socket } = useSocket();
  
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
        // In a real app, you'd have a specific /api/dashboard/stats endpoint
        // For now, we fetch counts manually to demonstrate
        const usersRes = await API.get("/users"); // You need to make this route or use a dummy count for now
        const productsRes = await API.get("/products");
        
        setStats({
            users: usersRes.data.length || 0,
            orders: 0, // Placeholder until we have orders
            revenue: 0
        });
      } catch (err) {
        console.error("Error fetching stats", err);
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
      setStats((prev) => ({ ...prev, orders: prev.orders + 1 }));
      setActivities((prev) => [`💰 New Order Received: ₹${data.totalPrice}`, ...prev]);
    });

    return () => {
      socket.off("new_user_joined");
      socket.off("new_order");
    };
  }, [socket]);

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-[#1a4d2e] mb-8">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
            icon={Users} 
            title="Total Users" 
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
            title="Revenue" 
            value={`₹${stats.revenue}`} 
            color="bg-[#d4a373]" 
        />
      </div>

      {/* Live Activity Feed */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-100 text-red-600 rounded-lg animate-pulse">
                <Activity size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Live Activity Feed</h2>
        </div>

        <div className="space-y-4 h-64 overflow-y-auto">
            {activities.length === 0 ? (
                <p className="text-gray-400 italic">Waiting for real-time events...</p>
            ) : (
                activities.map((act, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 bg-gray-50 rounded-xl border-l-4 border-[#1a4d2e] text-gray-700"
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
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4">
      <div className={`p-4 rounded-xl text-white shadow-lg ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-gray-400 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );
}
