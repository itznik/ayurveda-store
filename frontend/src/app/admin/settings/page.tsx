"use client";

import { Save, Globe, CreditCard, Truck } from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-4xl space-y-8 pb-20">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-luxury-dark dark:text-white">Store Settings</h1>
          <p className="text-neutral-500 dark:text-neutral-400">Manage your store details and configuration.</p>
        </div>
        <LuxuryButton className="shadow-lg">
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </LuxuryButton>
      </div>

      <div className="grid grid-cols-1 gap-8">
        
        {/* GENERAL SETTINGS */}
        <div className="bg-white dark:bg-[#0A1A15] p-8 rounded-3xl border border-neutral-200 dark:border-white/5 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-neutral-100 dark:border-white/5">
            <div className="p-2 bg-neutral-100 dark:bg-white/5 rounded-lg">
               <Globe className="h-5 w-5 text-luxury-dark dark:text-white" />
            </div>
            <h3 className="font-serif text-xl text-luxury-dark dark:text-white">General Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="Store Name" defaultValue="AyurLuxe" />
            <InputGroup label="Support Email" defaultValue="support@ayurluxe.com" />
            <InputGroup label="Currency" defaultValue="USD ($)" disabled />
            <InputGroup label="Timezone" defaultValue="(GMT-05:00) Eastern Time" />
          </div>
        </div>

        {/* PAYMENT & TAX */}
        <div className="bg-white dark:bg-[#0A1A15] p-8 rounded-3xl border border-neutral-200 dark:border-white/5 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-neutral-100 dark:border-white/5">
            <div className="p-2 bg-neutral-100 dark:bg-white/5 rounded-lg">
               <CreditCard className="h-5 w-5 text-luxury-dark dark:text-white" />
            </div>
            <h3 className="font-serif text-xl text-luxury-dark dark:text-white">Payment & Taxes</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="Tax Rate (%)" defaultValue="8.5" type="number" />
            <InputGroup label="Currency Symbol" defaultValue="$" />
          </div>
        </div>

        {/* SHIPPING */}
        <div className="bg-white dark:bg-[#0A1A15] p-8 rounded-3xl border border-neutral-200 dark:border-white/5 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-neutral-100 dark:border-white/5">
             <div className="p-2 bg-neutral-100 dark:bg-white/5 rounded-lg">
               <Truck className="h-5 w-5 text-luxury-dark dark:text-white" />
            </div>
            <h3 className="font-serif text-xl text-luxury-dark dark:text-white">Shipping Configuration</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="Free Shipping Threshold ($)" defaultValue="100" type="number" />
            <InputGroup label="Standard Shipping Cost ($)" defaultValue="15" type="number" />
          </div>
        </div>

      </div>
    </div>
  );
}

function InputGroup({ label, defaultValue, disabled, type = "text" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">{label}</label>
      <input 
        type={type}
        defaultValue={defaultValue}
        disabled={disabled}
        className="w-full px-4 py-3 bg-neutral-50 dark:bg-black/30 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-primary/20 dark:focus:ring-emerald-500/20 dark:text-white text-sm font-medium disabled:opacity-50"
      />
    </div>
  );
}
