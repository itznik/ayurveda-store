"use client";

import { motion } from "framer-motion";
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// MOCK DATA FOR GRAPH
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
  return (
    <main className="space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-luxury-dark dark:text-white">Dashboard Overview</h1>
          <p className="text-neutral-500 dark:text-neutral-400">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-2 bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl text-sm font-bold hover:bg-neutral-50 dark:hover:bg-white/10 transition-colors">Download Report</button>
           <button className="px-6 py-2 bg-luxury-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-luxury-primary/20">Add Product</button>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$48,290" icon={<DollarSign />} trend="+12.5%" trendUp={true} />
        <StatCard title="Total Orders" value="1,204" icon={<ShoppingBag />} trend="+8.2%" trendUp={true} />
        <StatCard title="Active Customers" value="892" icon={<Users />} trend="-2.4%" trendUp={false} />
        <StatCard title="Growth Rate" value="18.2%" icon={<TrendingUp />} trend="+4.1%" trendUp={true} />
      </div>

      {/* MAIN CHART SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: SALES GRAPH */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0A1A15] border border-neutral-200 dark:border-white/5 rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-serif text-xl text-luxury-dark dark:text-white">Revenue Analytics</h3>
            <select className="bg-transparent text-sm font-bold text-neutral-500 border-none outline-none cursor-pointer">
              <option>This Week</option>
              <option>Last Month</option>
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

        {/* RIGHT: RECENT ORDERS LIST */}
        <div className="bg-white dark:bg-[#0A1A15] border border-neutral-200 dark:border-white/5 rounded-3xl p-8 shadow-sm">
          <h3 className="font-serif text-xl text-luxury-dark dark:text-white mb-6">Recent Orders</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-neutral-50 dark:hover:bg-white/5 rounded-2xl transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-white/10 flex items-center justify-center font-serif text-xs">
                     AV
                   </div>
                   <div>
                     <p className="text-sm font-bold text-luxury-dark dark:text-white">Arya Vaidya</p>
                     <p className="text-xs text-neutral-500">2 mins ago</p>
                   </div>
                </div>
                <span className="text-xs font-bold text-luxury-primary dark:text-emerald-400">+$45.00</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-sm font-bold text-neutral-500 hover:text-luxury-dark dark:hover:text-white border border-dashed border-neutral-300 dark:border-white/10 rounded-xl hover:bg-neutral-50 dark:hover:bg-white/5 transition-all">
            View All Orders
          </button>
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
