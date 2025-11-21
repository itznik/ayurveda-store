"use client";

import { useState } from "react";
import { Search, Filter, MoreVertical, Ban, Trash2, Mail, ShieldCheck } from "lucide-react";

// MOCK CUSTOMER DATA
const CUSTOMERS = [
  { id: 1, name: "Arya Vaidya", email: "arya@example.com", joined: "Oct 20, 2024", spent: "$452.00", orders: 12, status: "VIP" },
  { id: 2, name: "Rahul Sharma", email: "rahul@gmail.com", joined: "Sep 15, 2024", spent: "$45.00", orders: 1, status: "Active" },
  { id: 3, name: "Sarah Jenkins", email: "sarah.j@outlook.com", joined: "Aug 02, 2024", spent: "$1,204.00", orders: 24, status: "Elite" },
  { id: 4, name: "Unknown User", email: "spammer@bot.com", joined: "Nov 01, 2024", spent: "$0.00", orders: 0, status: "Blocked" },
];

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState(CUSTOMERS);

  // Toggle Block/Active logic
  const toggleStatus = (id: number) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: c.status === "Blocked" ? "Active" : "Blocked" };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div>
        <h1 className="font-serif text-3xl text-luxury-dark dark:text-white">Customers</h1>
        <p className="text-neutral-500 dark:text-neutral-400">View and manage your user base.</p>
      </div>

      {/* FILTERS BAR */}
      <div className="bg-white dark:bg-[#0A1A15] p-4 rounded-2xl border border-neutral-200 dark:border-white/5 flex flex-col md:flex-row gap-4 shadow-sm">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search by name, email, or phone..." 
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 dark:bg-black/30 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none text-sm text-luxury-dark dark:text-white placeholder-neutral-400"
            />
         </div>
         <button className="flex items-center gap-2 px-6 py-3 bg-neutral-50 dark:bg-white/5 rounded-xl font-bold text-sm text-luxury-dark dark:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors">
            <Filter className="h-4 w-4" /> Segments
         </button>
      </div>

      {/* CUSTOMERS TABLE */}
      <div className="bg-white dark:bg-[#0A1A15] border border-neutral-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm overflow-x-auto">
        <table className="w-full text-left min-w-[900px]">
          <thead className="bg-neutral-50 dark:bg-white/5 border-b border-neutral-200 dark:border-white/5">
            <tr>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500">User Profile</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500">Date Joined</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500">Orders</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500">Lifetime Spent</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500">Status</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-white/5">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors group">
                
                {/* User Info */}
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-luxury-primary text-white flex items-center justify-center font-serif text-sm">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-luxury-dark dark:text-white text-sm">{customer.name}</p>
                      <p className="text-xs text-neutral-500">{customer.email}</p>
                    </div>
                  </div>
                </td>

                <td className="p-6 text-sm text-neutral-500">{customer.joined}</td>
                <td className="p-6 text-sm font-bold text-luxury-dark dark:text-white">{customer.orders} orders</td>
                <td className="p-6 text-sm font-bold text-luxury-primary dark:text-emerald-400">{customer.spent}</td>
                
                {/* Status Badge */}
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex w-fit items-center gap-1 ${
                    customer.status === "VIP" || customer.status === "Elite" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" :
                    customer.status === "Blocked" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  }`}>
                    {customer.status === "Elite" && <ShieldCheck className="h-3 w-3" />}
                    {customer.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-6 text-right">
                  <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-neutral-100 dark:hover:bg-white/10 rounded-lg text-neutral-500 hover:text-luxury-primary dark:hover:text-white tooltip" title="Send Email">
                       <Mail className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => toggleStatus(customer.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-neutral-500 hover:text-red-500" 
                      title="Block User"
                    >
                       <Ban className="h-4 w-4" />
                    </button>
                    <button className="p-2 hover:bg-neutral-100 dark:hover:bg-white/10 rounded-lg text-neutral-500" title="Delete">
                       <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
