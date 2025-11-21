"use client";

import { useState } from "react";
import { Search, Filter, Eye, CheckCircle, Truck, Clock } from "lucide-react";

// MOCK ORDERS DATA
const INITIAL_ORDERS = [
  { id: "#AY-8821", customer: "Arya Vaidya", date: "Oct 24, 2024", total: "$107.00", status: "Pending", items: 3 },
  { id: "#AY-8820", customer: "Rahul Sharma", date: "Oct 23, 2024", total: "$45.00", status: "Shipped", items: 1 },
  { id: "#AY-8819", customer: "Sarah Jenkins", date: "Oct 23, 2024", total: "$210.00", status: "Delivered", items: 5 },
  { id: "#AY-8818", customer: "Mike Ross", date: "Oct 22, 2024", total: "$62.00", status: "Pending", items: 2 },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  // Function to toggle status (Mock Logic)
  const toggleStatus = (id: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === id) {
        const nextStatus = order.status === "Pending" ? "Shipped" : order.status === "Shipped" ? "Delivered" : "Pending";
        return { ...order, status: nextStatus };
      }
      return order;
    }));
  };

  return (
    <div className="space-y-8">
      
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
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors group">
                <td className="p-6 font-bold text-luxury-dark dark:text-white">{order.id}</td>
                <td className="p-6 text-sm font-medium text-luxury-dark dark:text-neutral-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-luxury-primary/10 dark:bg-emerald-500/10 flex items-center justify-center text-xs font-bold text-luxury-primary dark:text-emerald-400">
                      {order.customer.charAt(0)}
                    </div>
                    {order.customer}
                  </div>
                </td>
                <td className="p-6 text-sm text-neutral-500">{order.date}</td>
                <td className="p-6 text-sm text-neutral-500">{order.items} items</td>
                <td className="p-6 font-bold text-luxury-dark dark:text-white">{order.total}</td>
                
                {/* STATUS BADGE (Clickable to toggle) */}
                <td className="p-6">
                  <button 
                    onClick={() => toggleStatus(order.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${
                    order.status === "Delivered" ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30" :
                    order.status === "Shipped" ? "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30" :
                    "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900/30"
                  }`}>
                    {order.status === "Delivered" && <CheckCircle className="h-3 w-3" />}
                    {order.status === "Shipped" && <Truck className="h-3 w-3" />}
                    {order.status === "Pending" && <Clock className="h-3 w-3" />}
                    {order.status}
                  </button>
                </td>

                <td className="p-6 text-right">
                  <button className="p-2 hover:bg-neutral-100 dark:hover:bg-white/10 rounded-lg text-neutral-500 hover:text-luxury-primary dark:hover:text-white transition-colors">
                     <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
