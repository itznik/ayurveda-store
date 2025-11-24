"use client";

import { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Smartphone, Monitor, Tablet, Loader2 } from "lucide-react";
import API from "@/lib/api";

// Static Data for features we don't track yet
const DEVICE_DATA = [
  { name: 'Mobile', value: 400, color: '#3A5A40' }, 
  { name: 'Desktop', value: 300, color: '#A3B18A' },
  { name: 'Tablet', value: 100, color: '#D4AF37' },
];

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);
  const [kpi, setKpi] = useState({
    avgOrderValue: "0",
    totalOrders: 0,
    revenue: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: orders } = await API.get("/orders");
        
        // 1. Calculate KPIs
        const totalRevenue = orders.reduce((acc: number, o: any) => acc + o.totalPrice, 0);
        const totalOrders = orders.length;
        const avgOv = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : "0";

        setKpi({
          avgOrderValue: avgOv,
          totalOrders,
          revenue: totalRevenue
        });

        // 2. Process Chart Data (Last 7 Days: Revenue vs Count)
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d;
        }).reverse();

        const processedChart = last7Days.map(date => {
            const dayName = days[date.getDay()];
            const dailyOrders = orders.filter((o: any) => 
                new Date(o.createdAt).toDateString() === date.toDateString()
            );
            
            return {
                name: dayName,
                sales: dailyOrders.reduce((acc: number, o: any) => acc + o.totalPrice, 0),
                count: dailyOrders.length
            };
        });

        setChartData(processedChart);

      } catch (error) {
        console.error("Analytics Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-10 w-10 animate-spin text-luxury-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      
      {/* HEADER */}
      <div>
        <h1 className="font-serif text-3xl text-luxury-dark dark:text-white">Analytics & Reports</h1>
        <p className="text-neutral-500 dark:text-neutral-400">Deep dive into your store's performance.</p>
      </div>

      {/* KPI CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Static Placeholder */}
        <AnalyticCard 
          title="Conversion Rate" 
          value="3.2%" 
          trend="+0.4%" 
          trendUp={true}
          desc="Percentage of visitors who bought items"
        />
        {/* Real Data */}
        <AnalyticCard 
          title="Avg. Order Value" 
          value={`₹${kpi.avgOrderValue}`} 
          trend="+12%" 
          trendUp={true}
          desc="Average amount spent per transaction"
        />
        {/* Static Placeholder */}
        <AnalyticCard 
          title="Cart Abandonment" 
          value="24%" 
          trend="-2.1%" 
          trendUp={true} 
          desc="Users who added items but didn't pay"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CHART 1: SALES VS COUNT (Real Data) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0A1A15] border border-neutral-200 dark:border-white/5 rounded-3xl p-8 shadow-sm">
          <h3 className="font-serif text-xl text-luxury-dark dark:text-white mb-6">Revenue vs Order Count</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A1A15', border: '1px solid #333', borderRadius: '12px', color: '#fff' }}
                  cursor={{fill: 'transparent'}}
                />
                <Bar yAxisId="left" dataKey="sales" fill="#A3B18A" radius={[4, 4, 0, 0]} name="Revenue (₹)" />
                <Bar yAxisId="right" dataKey="count" fill="#3A5A40" radius={[4, 4, 0, 0]} name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: DEVICE BREAKDOWN (Static Placeholder) */}
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
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-bold text-2xl text-luxury-dark dark:text-white">Est.</span>
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
        <div className={`flex items-center px-2 py-1 rounded-lg text-xs font-bold ${
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
