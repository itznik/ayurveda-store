"use client";

import { useState } from "react";
import { ArrowLeft, Upload, Save } from "lucide-react";
import Link from "next/link";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export default function AddProductPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="p-2 bg-white dark:bg-white/5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors">
            <ArrowLeft className="h-5 w-5 text-luxury-dark dark:text-white" />
          </Link>
          <h1 className="font-serif text-3xl text-luxury-dark dark:text-white">Add Product</h1>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 text-sm font-bold text-neutral-500 hover:text-luxury-dark dark:text-neutral-400 dark:hover:text-white transition-colors">
            Discard
          </button>
          <LuxuryButton className="shadow-lg">
            <Save className="h-4 w-4 mr-2" /> Save Product
          </LuxuryButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: MAIN INFO */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Basic Details */}
          <div className="bg-white dark:bg-[#0A1A15] p-8 rounded-3xl border border-neutral-200 dark:border-white/5 shadow-sm space-y-6">
            <h3 className="font-serif text-xl text-luxury-dark dark:text-white">General Information</h3>
            
            <InputGroup label="Product Name" placeholder="e.g. Kumkumadi Tailam" />
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Description</label>
              <textarea 
                rows={6}
                placeholder="Describe the ritual..."
                className="w-full p-4 bg-neutral-50 dark:bg-black/30 border border-neutral-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-luxury-primary/20 dark:focus:ring-emerald-500/20 dark:text-white placeholder-neutral-400 text-sm"
              />
            </div>
          </div>

          {/* Media */}
          <div className="bg-white dark:bg-[#0A1A15] p-8 rounded-3xl border border-neutral-200 dark:border-white/5 shadow-sm space-y-6">
            <h3 className="font-serif text-xl text-luxury-dark dark:text-white">Media</h3>
            <div className="border-2 border-dashed border-neutral-300 dark:border-white/10 rounded-2xl h-48 flex flex-col items-center justify-center text-neutral-400 hover:border-luxury-primary hover:text-luxury-primary dark:hover:border-emerald-400 dark:hover:text-emerald-400 transition-colors cursor-pointer bg-neutral-50 dark:bg-black/20">
              <Upload className="h-8 w-8 mb-2" />
              <p className="text-sm font-bold">Click to upload image</p>
              <p className="text-xs mt-1">or drag and drop</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SETTINGS */}
        <div className="space-y-8">
          
          {/* Pricing */}
          <div className="bg-white dark:bg-[#0A1A15] p-8 rounded-3xl border border-neutral-200 dark:border-white/5 shadow-sm space-y-6">
            <h3 className="font-serif text-xl text-luxury-dark dark:text-white">Pricing</h3>
            <InputGroup label="Base Price ($)" placeholder="0.00" type="number" />
            <InputGroup label="Discount Price ($)" placeholder="0.00" type="number" />
          </div>

          {/* Organization */}
          <div className="bg-white dark:bg-[#0A1A15] p-8 rounded-3xl border border-neutral-200 dark:border-white/5 shadow-sm space-y-6">
            <h3 className="font-serif text-xl text-luxury-dark dark:text-white">Organization</h3>
            <div className="space-y-4">
              <SelectGroup label="Category" options={["Face Oil", "Serum", "Toner", "Hair Care"]} />
              <SelectGroup label="Status" options={["Draft", "Active", "Archived"]} />
              <InputGroup label="Stock Quantity" placeholder="0" type="number" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Helper Components
function InputGroup({ label, placeholder, type = "text" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">{label}</label>
      <input 
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-neutral-50 dark:bg-black/30 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-primary/20 dark:focus:ring-emerald-500/20 dark:text-white placeholder-neutral-400 text-sm font-medium"
      />
    </div>
  );
}

function SelectGroup({ label, options }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">{label}</label>
      <select className="w-full px-4 py-3 bg-neutral-50 dark:bg-black/30 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-primary/20 dark:focus:ring-emerald-500/20 dark:text-white text-sm font-medium cursor-pointer">
        {options.map((opt: string) => <option key={opt}>{opt}</option>)}
      </select>
    </div>
  );
}
