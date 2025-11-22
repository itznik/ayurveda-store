"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight, ArrowDownRight, Plus } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import API from "@/lib/api";
import { useSocket } from "@/context/SocketContext";

// STATIC GRAPH DATA (Placeholder until we build advanced analytics endpoint)
const SALES_DATA = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 6890 },
  { name: 'Sat', sales: 8390 },
  { name: 'Sun', sales: 10400 },
];

export default function AdminDashboard() {
  const { socket } = useSocket();
  
  // Real State
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. FETCH INITIAL DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch All Orders to calculate stats
        const { data: orders } = await API.get("/orders");
        
        // Calculate Revenue
        const totalRevenue = orders.reduce((acc: number, order: any) => acc + (order.totalPrice || 0), 0);
        
        // Calculate Unique Customers (Simple approximation based on unique User IDs in orders)
        const uniqueUsers = new Set(orders.map((o: any) => o.user?._id || o.user)).size;

        setStats({
          revenue: totalRevenue,
          orders: orders.length,
          customers: uniqueUsers || 0
        });

        // Get Recent 5 Orders
        // Sort by date (newest first) then slice
        const sorted = orders.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setRecentOrders(sorted.slice(0, 5));

      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2. REAL-TIME LISTENERS
  useEffect(() => {
    if (!socket) return;

    // Listen for new orders live
    socket.on("new_order", (newOrder: any) => {
      // Play notification sound (optional)
      // const audio = new Audio('/sounds/ping.mp3'); audio.play();

      setStats((prev) => ({
        ...prev,
        revenue: prev.revenue + newOrder.totalPrice,
        orders: prev.orders + 1,
        // Assuming new order might be new customer, logic could be complex, just incrementing for visual effect
        customers: prev.customers + 1 
      }));

      setRecentOrders((prev) => [newOrder, ...prev].slice(0, 5));
    });

    return () => {
      socket.off("new_order");
    };
  }, [socket]);

  return (
    <main className="space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-luxury-dark dark:text-white">Dashboard Overview</h1>
          <p className="text-neutral-500 dark:text-neutral-400">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
           {/* <button className="px-6 py-2 bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl text-sm font-bold hover:bg-neutral-50 dark:hover:bg-white/10 transition-colors">Download Report</button> */}
           <Link href="/admin/products/new">
             <button className="px-6 py-2 bg-luxury-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-luxury-primary/20 flex items-center gap-2 hover:bg-luxury-dark transition-colors">
               <Plus className="h-4 w-4" /> Add Product
             </button>
           </Link>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`₹${stats.revenue.toLocaleString()}`} 
          icon={<DollarSign />} 
          trend="+12.5%" // Hardcoded trend for now (requires historical data comparison)
          trendUp={true} 
        />
        <StatCard 
          title="Total Orders" 
          value={stats.orders} 
          icon={<ShoppingBag />} 
          trend="+8.2%" 
          trendUp={true} 
        />
        <StatCard 
          title="Active Customers" 
          value={stats.customers} 
          icon={<Users />} 
          trend="+2.4%" 
          trendUp={true} 
        />
        <StatCard 
          title="Growth Rate" 
          value="18.2%" 
          icon={<TrendingUp />} 
          trend="+4.1%" 
          trendUp={true} 
        />
      </div>

      {/* MAIN CHART SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: SALES GRAPH (Static Data Visualization) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0A1A15] border border-neutral-200 dark:border-white/5 rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-serif text-xl text-luxury-dark dark:text-white">Revenue Analytics</h3>
            <select className="bg-transparent text-sm font-bold text-neutral-500 border-none outline-none cursor-pointer">
              <option>This Week</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_DATA}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3A5A40" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3A5A40" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A1A15', border: '1px solid #333', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#A3B18A' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#3A5A40" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT: RECENT ORDERS LIST (Real Data) */}
        <div className="bg-white dark:bg-[#0A1A15] border border-neutral-200 dark:border-white/5 rounded-3xl p-8 shadow-sm flex flex-col">
          <h3 className="font-serif text-xl text-luxury-dark dark:text-white mb-6">Recent Orders</h3>
          
          <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar max-h-[300px]">
            {loading ? (
              <p className="text-sm text-neutral-500">Loading orders...</p>
            ) : recentOrders.length === 0 ? (
              <p className="text-sm text-neutral-500">No orders yet.</p>
            ) : (
              recentOrders.map((order) => (
                <div key={order._id} className="flex items-center justify-between p-3 hover:bg-neutral-50 dark:hover:bg-white/5 rounded-2xl transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-white/10 flex items-center justify-center font-serif text-xs font-bold text-luxury-dark dark:text-white">
                       {order.user?.name ? order.user.name.charAt(0).toUpperCase() : 'G'}
                     </div>
                     <div>
                       <p className="text-sm font-bold text-luxury-dark dark:text-white line-clamp-1">
                         {order.user?.name || "Guest User"}
                       </p>
                       <p className="text-xs text-neutral-500">
                         {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </p>
                     </div>
                  </div>
                  <span className="text-xs font-bold text-luxury-primary dark:text-emerald-400">
                    +₹{order.totalPrice.toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>

          <Link href="/admin/orders" className="mt-auto">
            <button className="w-full mt-6 py-3 text-sm font-bold text-neutral-500 hover:text-luxury-dark dark:hover:text-white border border-dashed border-neutral-300 dark:border-white/10 rounded-xl hover:bg-neutral-50 dark:hover:bg-white/5 transition-all">
              View All Orders
            </button>
          </Link>
        </div>

      </div>
    </main>
  );
}

// HELPER: STAT CARD
function StatCard({ title, value, icon, trend, trendUp }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-[#0A1A15] border border-neutral-200 dark:border-white/5 rounded-3xl p-6 shadow-sm"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-neutral-100 dark:bg-white/5 rounded-2xl text-luxury-dark dark:text-white">
          {icon}
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${trendUp ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
          {trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {trend}
        </div>
      </div>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-1">{title}</p>
      <h3 className="font-serif text-2xl md:text-3xl text-luxury-dark dark:text-white">{value}</h3>
    </motion.div>
  )
        }
