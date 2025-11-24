"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import API from "@/lib/api";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    countInStock: "",
    image: ""
  });

  // 1. Fetch Existing Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setFormData({
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            countInStock: data.countInStock,
            image: data.image
        });
      } catch (error) {
        console.error("Failed to load product", error);
        alert("Product not found!");
        router.push("/admin/products");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id, router]);

  // 2. Handle Update
  const handleUpdate = async () => {
    setSaving(true);
    try {
      await API.put(`/products/${id}`, {
        ...formData,
        price: Number(formData.price),
        countInStock: Number(formData.countInStock)
      });
      alert("Product updated successfully!");
      router.push("/admin/products");
    } catch (error) {
      alert("Update failed.");
    } finally {
      setSaving(false);
    }
  };

  // 3. Handle Delete
  const handleDelete = async () => {
    if(!confirm("Are you sure? This cannot be undone.")) return;
    try {
      await API.delete(`/products/${id}`);
      router.push("/admin/products");
    } catch(err) { alert("Delete failed"); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="p-20 text-center">Loading Product...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="p-2 bg-white dark:bg-white/5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors">
            <ArrowLeft className="h-5 w-5 text-luxury-dark dark:text-white" />
          </Link>
          <h1 className="font-serif text-3xl text-luxury-dark dark:text-white">Edit Product</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={handleDelete} className="px-6 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors flex items-center gap-2">
            <Trash2 className="h-4 w-4" /> Delete
          </button>
          <div onClick={!saving ? handleUpdate : undefined}>
            <LuxuryButton className="shadow-lg w-40 flex justify-center">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4 mr-2" /> Save Changes</>}
            </LuxuryButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-[#0A1A15] p-8 rounded-3xl border border-neutral-200 dark:border-white/5 shadow-sm space-y-6">
            <h3 className="font-serif text-xl text-luxury-dark dark:text-white">General Information</h3>
            <InputGroup label="Product Name" name="name" value={formData.name} onChange={handleChange} />
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Description</label>
              <textarea rows={6} name="description" value={formData.description} onChange={handleChange} className="w-full p-4 bg-neutral-50 dark:bg-black/30 border border-neutral-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-luxury-primary/20 dark:text-white text-sm" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0A1A15] p-8 rounded-3xl border border-neutral-200 dark:border-white/5 shadow-sm space-y-6">
            <h3 className="font-serif text-xl text-luxury-dark dark:text-white">Media</h3>
            <InputGroup label="Image URL" name="image" value={formData.image} onChange={handleChange} />
            {formData.image && <img src={formData.image} className="h-40 w-full object-cover rounded-xl mt-4" />}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-[#0A1A15] p-8 rounded-3xl border border-neutral-200 dark:border-white/5 shadow-sm space-y-6">
            <h3 className="font-serif text-xl text-luxury-dark dark:text-white">Pricing</h3>
            <InputGroup label="Price (₹)" name="price" type="number" value={formData.price} onChange={handleChange} />
          </div>

          <div className="bg-white dark:bg-[#0A1A15] p-8 rounded-3xl border border-neutral-200 dark:border-white/5 shadow-sm space-y-6">
            <h3 className="font-serif text-xl text-luxury-dark dark:text-white">Organization</h3>
            <div className="space-y-4">
              <InputGroup label="Category" name="category" value={formData.category} onChange={handleChange} />
              <InputGroup label="Stock Quantity" name="countInStock" type="number" value={formData.countInStock} onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputGroup({ label, type = "text", name, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} className="w-full px-4 py-3 bg-neutral-50 dark:bg-black/30 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-primary/20 dark:text-white text-sm font-medium" />
    </div>
  );
}
