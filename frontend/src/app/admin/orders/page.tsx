"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Eye, CheckCircle, Truck, Clock, Loader2 } from "lucide-react";
import API from "@/lib/api";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. FETCH ORDERS
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders");
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // 2. FILTER LOGIC
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    const idMatch = order._id.toLowerCase().includes(searchLower);
    const nameMatch = order.user?.name?.toLowerCase().includes(searchLower) || "guest";
    return idMatch || nameMatch;
  });

  // Helper to determine status color
  const getStatusColor = (isDelivered: boolean, isPaid: boolean) => {
    if (isDelivered) return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30";
    if (isPaid) return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30";
    return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900/30";
  };

  const getStatusText = (isDelivered: boolean, isPaid: boolean) => {
    if (isDelivered) return "Delivered";
    if (isPaid) return "Processing";
    return "Pending";
  };

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
        <h1 className="font-serif text-3xl text-luxury-dark dark:text-white">Order Management</h1>
        <p className="text-neutral-500 dark:text-neutral-400">Track and manage customer orders.</p>
      </div>

      {/* FILTERS */}
      <div className="bg-white dark:bg-[#0A1A15] p-4 rounded-2xl border border-neutral-200 dark:border-white/5 flex flex-col md:flex-row gap-4 shadow-sm">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search order ID or customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 dark:bg-black/30 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none text-sm text-luxury-dark dark:text-white"
            />
         </div>
         <button className="flex items-center gap-2 px-6 py-3 bg-neutral-50 dark:bg-white/5 rounded-xl font-bold text-sm text-luxury-dark dark:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors">
            <Filter className="h-4 w-4" /> Filter Status
         </button>
      </div>

      {/* ORDERS TABLE */}
      <div className="bg-white dark:bg-[#0A1A15] border border-neutral-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-neutral-50 dark:bg-white/5 border-b border-neutral-200 dark:border-white/5">
            <tr>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500">Order ID</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500">Customer</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500">Date</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500">Items</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500">Total</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500">Status</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-white/5">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-10 text-center text-neutral-500">No orders found.</td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors group">
                  
                  <td className="p-6 font-bold text-luxury-dark dark:text-white text-xs tracking-wide">
                    #{order._id.substring(0, 8)}...
                  </td>
                  
                  <td className="p-6 text-sm font-medium text-luxury-dark dark:text-neutral-300">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-luxury-primary/10 dark:bg-emerald-500/10 flex items-center justify-center text-xs font-bold text-luxury-primary dark:text-emerald-400">
                        {order.user?.name ? order.user.name.charAt(0).toUpperCase() : 'G'}
                      </div>
                      {order.user?.name || "Guest User"}
                    </div>
                  </td>
                  
                  <td className="p-6 text-sm text-neutral-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  
                  <td className="p-6 text-sm text-neutral-500">
                    {order.orderItems.reduce((acc: number, item: any) => acc + item.qty, 0)} items
                  </td>
                  
                  <td className="p-6 font-bold text-luxury-dark dark:text-white">
                    ₹{order.totalPrice.toFixed(2)}
                  </td>
                  
                  {/* STATUS BADGE */}
                  <td className="p-6">
                    <span className={`flex items-center gap-2 w-fit px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${getStatusColor(order.isDelivered, order.isPaid)}`}>
                      {order.isDelivered ? <CheckCircle className="h-3 w-3" /> : 
                       order.isPaid ? <Truck className="h-3 w-3" /> : 
                       <Clock className="h-3 w-3" />}
                      {getStatusText(order.isDelivered, order.isPaid)}
                    </span>
                  </td>

                  <td className="p-6 text-right">
                    <button className="p-2 hover:bg-neutral-100 dark:hover:bg-white/10 rounded-lg text-neutral-500 hover:text-luxury-primary dark:hover:text-white transition-colors">
                       <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
