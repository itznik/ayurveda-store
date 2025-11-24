"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus, Search, Filter, Loader2 } from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import API from "@/lib/api";
import { Product } from "@/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 2. DELETE PRODUCT
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await API.delete(`/products/${id}`);
        // Remove from local state to update UI instantly
        setProducts(products.filter((p) => p._id !== id));
      } catch (error) {
        alert("Failed to delete product");
      }
    }
  };

  // 3. FILTER LOGIC
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-10 w-10 animate-spin text-luxury-primary" />
      </div>
    );
  }

  return (
    <main className="space-y-8 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h1 className="font-serif text-3xl text-luxury-dark dark:text-white">Products</h1>
            <p className="text-neutral-500 dark:text-neutral-400">Manage your inventory and catalog.</p>
         </div>
         <Link href="/admin/products/new">
            <LuxuryButton className="rounded-xl shadow-lg flex items-center">
               <Plus className="h-4 w-4 mr-2" /> Add Product
            </LuxuryButton>
         </Link>
      </div>

      {/* FILTERS BAR */}
      <div className="bg-white dark:bg-[#0A1A15] p-4 rounded-2xl border border-neutral-200 dark:border-white/5 flex flex-col md:flex-row gap-4 shadow-sm">
         <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 dark:bg-black/30 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-primary/20 text-sm"
            />
         </div>
         <button className="flex items-center gap-2 px-6 py-3 bg-neutral-50 dark:bg-white/5 rounded-xl font-bold text-sm hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors text-luxury-dark dark:text-white">
            <Filter className="h-4 w-4" /> Filters
         </button>
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-[#0A1A15] border border-neutral-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
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
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-neutral-500">No products found.</td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors group">
                    <td className="p-6 font-bold text-luxury-dark dark:text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-neutral-100 overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        {product.name}
                      </div>
                    </td>
                    <td className="p-6 text-sm text-neutral-500">{product.category}</td>
                    <td className="p-6 text-sm font-bold text-luxury-dark dark:text-white">₹{product.price.toFixed(2)}</td>
                    <td className="p-6 text-sm text-neutral-500">{product.countInStock} units</td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        product.countInStock > 10 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                        product.countInStock > 0 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}>
                        {product.countInStock > 10 ? "Active" : product.countInStock > 0 ? "Low Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/products/${product._id}`}>
                          <button className="p-2 hover:bg-neutral-100 dark:hover:bg-white/10 rounded-lg text-luxury-primary dark:text-emerald-400">
                            <Edit className="h-4 w-4" />
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
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
    </main>
  );
}
