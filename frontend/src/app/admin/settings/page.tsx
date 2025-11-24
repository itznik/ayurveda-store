"use client";

import { useState, useEffect } from "react";
import { Save, Globe, CreditCard, Truck, Loader2 } from "lucide-react";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import API from "@/lib/api";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true); // Initial load state
  const [saving, setSaving] = useState(false);  // Save button state
  
  // State for form fields
  const [settings, setSettings] = useState({
    storeName: "",
    supportEmail: "",
    currency: "INR (₹)", // Hardcoded for display context
    timezone: "(GMT+05:30) Kolkata, India",
    taxRate: 0, 
    currencySymbol: "",
    freeShippingThreshold: 0,
    shippingCost: 0
  });

  // 1. Fetch Settings from Database on Mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await API.get("/settings");
        if (data) {
            setSettings({
                ...data,
                // Ensure we keep defaults for visual consistency if DB is empty
                currency: "INR (₹)",
                timezone: "(GMT+05:30) Kolkata, India"
            });
        }
      } catch (error) {
        console.error("Failed to load settings", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Send update to backend
      await API.put('/settings', settings);
      alert("Settings updated successfully!");
    } catch (error) {
      console.error("Save failed", error);
      alert("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-10 w-10 animate-spin text-luxury-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 pb-20">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-luxury-dark dark:text-white">Store Settings</h1>
          <p className="text-neutral-500 dark:text-neutral-400">Manage your store details and configuration.</p>
        </div>
        <div onClick={!saving ? handleSave : undefined}>
          <LuxuryButton className="shadow-lg w-40 flex justify-center">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4 mr-2" /> Save Changes</>}
          </LuxuryButton>
        </div>
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
            <InputGroup 
              label="Store Name" 
              name="storeName" 
              value={settings.storeName} 
              onChange={handleChange} 
            />
            <InputGroup 
              label="Support Email" 
              name="supportEmail" 
              value={settings.supportEmail} 
              onChange={handleChange} 
            />
            <InputGroup 
              label="Currency" 
              name="currency" 
              value={settings.currency} 
              disabled 
            />
            <InputGroup 
              label="Timezone" 
              name="timezone" 
              value={settings.timezone} 
              onChange={handleChange} 
            />
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
            <InputGroup 
              label="GST Rate (%)" 
              name="taxRate" 
              value={settings.taxRate} 
              type="number" 
              onChange={handleChange} 
            />
            <InputGroup 
              label="Currency Symbol" 
              name="currencySymbol" 
              value={settings.currencySymbol} 
              onChange={handleChange} 
            />
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
            <InputGroup 
              label="Free Shipping Threshold (₹)" 
              name="freeShippingThreshold" 
              value={settings.freeShippingThreshold} 
              type="number" 
              onChange={handleChange} 
            />
            <InputGroup 
              label="Standard Shipping Cost (₹)" 
              name="shippingCost" 
              value={settings.shippingCost} 
              type="number" 
              onChange={handleChange} 
            />
          </div>
        </div>

      </div>
    </div>
  );
}

function InputGroup({ label, name, value, onChange, disabled, type = "text" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">{label}</label>
      <input 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full px-4 py-3 bg-neutral-50 dark:bg-black/30 border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-primary/20 dark:focus:ring-emerald-500/20 dark:text-white text-sm font-medium disabled:opacity-50"
      />
    </div>
  );
}
