"use client";

import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Smartphone, Monitor, Tablet } from "lucide-react";

// --- MOCK DATA ---
const TRAFFIC_DATA = [
  { name: 'Mon', visitors: 2400, orders: 400 },
  { name: 'Tue', visitors: 1398, orders: 300 },
  { name: 'Wed', visitors: 9800, orders: 2000 },
  { name: 'Thu', visitors: 3908, orders: 1890 },
  { name: 'Fri', visitors: 4800, orders: 2390 },
  { name: 'Sat', visitors: 3800, orders: 1500 },
  { name: 'Sun', visitors: 4300, orders: 1700 },
];

const DEVICE_DATA = [
  { name: 'Mobile', value: 400, color: '#3A5A40' }, // Luxury Primary
  { name: 'Desktop', value: 300, color: '#A3B18A' }, // Sage
  { name: 'Tablet', value: 100, color: '#D4AF37' }, // Gold
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8 pb-20">
      
      {/* HEADER */}
      <div>
        <h1 className="font-serif text-3xl text-luxury-dark dark:text-white">Analytics & Reports</h1>
        <p className="text-neutral-500 dark:text-neutral-400">Deep dive into your store's performance.</p>
      </div>

      {/* KPI CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticCard 
          title="Conversion Rate" 
          value="3.2%" 
          trend="+0.4%" 
          trendUp={true}
          desc="Percentage of visitors who bought items"
        />
        <AnalyticCard 
          title="Avg. Order Value" 
          value="$82.40" 
          trend="+12%" 
          trendUp={true}
          desc="Average amount spent per transaction"
        />
        <AnalyticCard 
          title="Cart Abandonment" 
          value="24%" 
          trend="-2.1%" 
          trendUp={true} // Good because it went down
          desc="Users who added items but didn't pay"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CHART 1: TRAFFIC vs ORDERS (Double Bar Chart) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0A1A15] border border-neutral-200 dark:border-white/5 rounded-3xl p-8 shadow-sm">
          <h3 className="font-serif text-xl text-luxury-dark dark:text-white mb-6">Traffic vs Orders</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TRAFFIC_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A1A15', border: '1px solid #333', borderRadius: '12px', color: '#fff' }}
                  cursor={{fill: 'transparent'}}
                />
                <Bar dataKey="visitors" fill="#A3B18A" radius={[4, 4, 0, 0]} name="Visitors" />
                <Bar dataKey="orders" fill="#3A5A40" radius={[4, 4, 0, 0]} name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: DEVICE BREAKDOWN (Donut Chart) */}
        <div className="bg-white dark:bg-[#0A1A15] border border-neutral-200 dark:border-white/5 rounded-3xl p-8 shadow-sm flex flex-col">
          <h3 className="font-serif text-xl text-luxury-dark dark:text-white mb-2">Sessions by Device</h3>
          <p className="text-xs text-neutral-500 mb-6">Most users shop via Mobile.</p>
          
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DEVICE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DEVICE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0A1A15', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-bold text-2xl text-luxury-dark dark:text-white">800</span>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-luxury-primary" />
                <span className="text-neutral-500">Mobile</span>
              </div>
              <span className="font-bold text-luxury-dark dark:text-white">50%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-luxury-sage" />
                <span className="text-neutral-500">Desktop</span>
              </div>
              <span className="font-bold text-luxury-dark dark:text-white">37%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <Tablet className="h-4 w-4 text-yellow-600" />
                <span className="text-neutral-500">Tablet</span>
              </div>
              <span className="font-bold text-luxury-dark dark:text-white">13%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function AnalyticCard({ title, value, trend, trendUp, desc }: any) {
  return (
    <div className="bg-white dark:bg-[#0A1A15] border border-neutral-200 dark:border-white/5 rounded-3xl p-6 shadow-sm">
      <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-2">{title}</p>
      <div className="flex items-end gap-3 mb-2">
        <h2 className="text-4xl font-serif text-luxury-dark dark:text-white">{value}</h2>
        <div className={`flex items-center px-2 py-1 rounded-lg text-xs font-bold mb-1 ${
          trendUp ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700'
        }`}>
          {trendUp ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
          {trend}
        </div>
      </div>
      <p className="text-xs text-neutral-400">{desc}</p>
    </div>
  );
}
