"use client";

import { Edit, Trash2, Plus, Search, Filter } from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

// Mock Table Data
const PRODUCTS = [
  { id: 1, name: "Kumkumadi Tailam", category: "Face Oil", price: 45.00, stock: 124, status: "Active" },
  { id: 2, name: "Saffron Elixir", category: "Serum", price: 62.00, stock: 45, status: "Low Stock" },
  { id: 3, name: "Rose Mist", category: "Toner", price: 28.00, stock: 0, status: "Out of Stock" },
];

export default function AdminProductsPage() {
  return (
    <main className="space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h1 className="font-serif text-3xl text-luxury-dark dark:text-white">Products</h1>
            <p className="text-neutral-500 dark:text-neutral-400">Manage your inventory and catalog.</p>
         </div>
         <Link href="/admin/products/new">
  <LuxuryButton className="rounded-xl shadow-lg">
     <Plus className="h-4 w-4 mr-2" /> Add Product
  </LuxuryButton>
</Link>
      </div>

      {/* FILTERS BAR */}
      <div className="bg-white dark:bg-[#0A1A15] p-4 rounded-2xl border border-neutral-200 dark:border-white/5 flex flex-col md:flex-row gap-4">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 dark:bg-black/30 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none text-sm"
            />
         </div>
         <button className="flex items-center gap-2 px-6 py-3 bg-neutral-50 dark:bg-white/5 rounded-xl font-bold text-sm hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors">
            <Filter className="h-4 w-4" /> Filters
         </button>
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-[#0A1A15] border border-neutral-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-neutral-50 dark:bg-white/5 border-b border-neutral-200 dark:border-white/5">
            <tr>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500">Product</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500">Category</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500">Price</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500">Stock</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500">Status</th>
              <th className="p-6 text-xs font-bold uppercase tracking-widest text-neutral-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-white/5">
            {PRODUCTS.map((product) => (
              <tr key={product.id} className="hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors group">
                <td className="p-6 font-bold text-luxury-dark dark:text-white">{product.name}</td>
                <td className="p-6 text-sm text-neutral-500">{product.category}</td>
                <td className="p-6 text-sm font-bold text-luxury-dark dark:text-white">${product.price.toFixed(2)}</td>
                <td className="p-6 text-sm text-neutral-500">{product.stock} units</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    product.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                    product.status === "Low Stock" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="p-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-neutral-100 dark:hover:bg-white/10 rounded-lg text-luxury-primary dark:text-emerald-400">
                       <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500">
                       <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
