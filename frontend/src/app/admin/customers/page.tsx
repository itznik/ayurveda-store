"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Filter, MoreVertical, Ban, Trash2, Mail, ShieldCheck, Loader2 } from "lucide-react";
import API from "@/lib/api";

// Define Types
interface CustomerStats {
  id: string;
  name: string;
  email: string;
  joined: string;
  spent: number;
  orders: number;
  status: string;
  role: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. FETCH ORDERS TO CALCULATE CUSTOMER STATS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: orders } = await API.get("/orders");
        
        // Logic: Group orders by User ID to calculate Lifetime Value
        const customerMap = new Map<string, CustomerStats>();

        orders.forEach((order: any) => {
          if (!order.user) return; // Skip guest orders if any

          const userId = order.user._id;
          
          if (!customerMap.has(userId)) {
            customerMap.set(userId, {
              id: userId,
              name: order.user.name,
              email: order.user.email,
              // Use createdAt from the user object if available, else first order date
              joined: new Date(order.createdAt).toLocaleDateString(), 
              spent: 0,
              orders: 0,
              status: "Active", // Default
              role: "Member"
            });
          }

          const customer = customerMap.get(userId)!;
          customer.spent += order.totalPrice;
          customer.orders += 1;
          
          // Simple Logic: If spent > 5000, mark as VIP
          if (customer.spent > 10000) customer.status = "Elite";
          else if (customer.spent > 5000) customer.status = "VIP";
        });

        setCustomers(Array.from(customerMap.values()));

      } catch (error) {
        console.error("Failed to load customers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2. SEARCH FILTER
  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="font-serif text-3xl text-luxury-dark dark:text-white">Customers</h1>
        <p className="text-neutral-500 dark:text-neutral-400">View and manage your user base.</p>
      </div>

      {/* FILTERS BAR */}
      <div className="bg-white dark:bg-[#0A1A15] p-4 rounded-2xl border border-neutral-200 dark:border-white/5 flex flex-col md:flex-row gap-4 shadow-sm">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 dark:bg-black/30 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none text-sm text-luxury-dark dark:text-white placeholder-neutral-400"
            />
         </div>
         <button className="flex items-center gap-2 px-6 py-3 bg-neutral-50 dark:bg-white/5 rounded-xl font-bold text-sm text-luxury-dark dark:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors">
            <Filter className="h-4 w-4" /> Filter
         </button>
      </div>

      {/* CUSTOMERS TABLE */}
      <div className="bg-white dark:bg-[#0A1A15] border border-neutral-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm overflow-x-auto">
        <table className="w-full text-left min-w-[900px]">
          <thead className="bg-neutral-50 dark:bg-white/5 border-b border-neutral-200 dark:border-white/5">
            <tr>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500">User Profile</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500">First Active</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500">Orders</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500">Lifetime Spent</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500">Status</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-white/5">
            {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-neutral-500">No customers found.</td>
                </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors group">
                  
                  {/* User Info */}
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-luxury-primary text-white flex items-center justify-center font-serif text-sm font-bold">
                        {customer.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-luxury-dark dark:text-white text-sm">{customer.name}</p>
                        <p className="text-xs text-neutral-500">{customer.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-6 text-sm text-neutral-500">{customer.joined}</td>
                  <td className="p-6 text-sm font-bold text-luxury-dark dark:text-white">{customer.orders} orders</td>
                  <td className="p-6 text-sm font-bold text-luxury-primary dark:text-emerald-400">₹{customer.spent.toFixed(2)}</td>
                  
                  {/* Status Badge */}
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex w-fit items-center gap-1 ${
                      customer.status === "VIP" || customer.status === "Elite" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" :
                      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    }`}>
                      {customer.status === "Elite" && <ShieldCheck className="h-3 w-3" />}
                      {customer.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-neutral-100 dark:hover:bg-white/10 rounded-lg text-neutral-500 hover:text-luxury-primary dark:hover:text-white" title="Email">
                         <Mail className="h-4 w-4" />
                      </button>
                      <button className="p-2 hover:bg-neutral-100 dark:hover:bg-white/10 rounded-lg text-neutral-500 hover:text-red-500" title="Block">
                         <Ban className="h-4 w-4" />
                      </button>
                    </div>
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
