"use client";

import React, { useState, useEffect } from "react"; // Fixed React import
import { useRouter } from "next/navigation";
import { Package, MapPin, Heart, LogOut, User, ChevronRight, Loader2, ShoppingBag } from "lucide-react";
import API from "@/lib/api"; // Import API Bridge

// Define Order Type locally for this page
interface Order {
  _id: string;
  createdAt: string;
  totalPrice: number;
  isDelivered: boolean;
  orderItems: any[];
}

export default function AccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("orders");
  const [userInfo, setUserInfo] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. CHECK AUTH & FETCH DATA
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("userInfo");
    
    if (!storedUser) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    setUserInfo(user);

    // Fetch User's Orders
    const fetchOrders = async () => {
      try {
        // Note: We will need to ensure this route exists in backend later
        // For now, we try to fetch. If backend is missing this specific route, 
        // it might need a small update, but this is the correct Frontend code.
        const { data } = await API.get("/orders/myorders"); 
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders", error);
        // If API fails (route doesn't exist yet), we just show empty list for now
        setOrders([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  // 2. LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("userInfo"); // Clear data
    router.push("/login"); // Redirect
  };

  if (!userInfo) return null; // Don't render if redirecting

  return (
    // REMOVED Navbar & Footer (Handled in Layout)
    <main className="min-h-screen bg-[#F4F7F5] dark:bg-[#050505] transition-colors duration-500 pt-10 pb-20">
      
      <div className="max-w-7xl mx-auto px-4">
        
        {/* HEADER */}
        <div className="mb-12 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-luxury-primary text-white flex items-center justify-center text-2xl font-serif font-bold shadow-lg">
            {/* Get Initials from Name */}
            {userInfo.name ? userInfo.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <h1 className="font-serif text-3xl text-luxury-dark dark:text-white">Namaste, {userInfo.name}</h1>
            <p className="text-neutral-500 dark:text-neutral-400">{userInfo.email} • {userInfo.role === 'admin' ? 'Admin Access' : 'Member'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR MENU */}
          <div className="space-y-2">
            <MenuButton 
              icon={<Package />} label="My Orders" active={activeTab === "orders"} 
              onClick={() => setActiveTab("orders")} 
            />
            <MenuButton 
              icon={<MapPin />} label="Addresses" active={activeTab === "addresses"} 
              onClick={() => setActiveTab("addresses")} 
            />
            {/* Feature for later */}
            {/* <MenuButton 
              icon={<Heart />} label="Wishlist" active={activeTab === "wishlist"} 
              onClick={() => setActiveTab("wishlist")} 
            /> */}
            <MenuButton 
              icon={<User />} label="Settings" active={activeTab === "settings"} 
              onClick={() => setActiveTab("settings")} 
            />
            
            <div className="pt-4 border-t border-neutral-200 dark:border-white/10 mt-4">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-5 py-3 w-full text-left rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </div>
          </div>

          {/* CONTENT AREA */}
          <div className="lg:col-span-3 bg-white dark:bg-white/5 rounded-3xl border border-neutral-100 dark:border-white/5 p-8 min-h-[500px]">
            
            {/* --- ORDERS TAB --- */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl text-luxury-dark dark:text-white mb-6">Order History</h2>
                
                {loading ? (
                   <div className="flex justify-center py-10"><Loader2 className="animate-spin" /></div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-20 text-neutral-500">
                        <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    orders.map((order) => (
                        <div key={order._id} className="border border-neutral-200 dark:border-white/10 rounded-2xl p-6 hover:shadow-md transition-shadow bg-neutral-50/50 dark:bg-transparent">
                            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
                                <div>
                                    <p className="font-bold text-luxury-dark dark:text-white">Order #{order._id.substring(0, 8)}...</p>
                                    <p className="text-sm text-neutral-500">
                                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${
                                    order.isDelivered 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-yellow-100 text-yellow-800"
                                }`}>
                                    {order.isDelivered ? "Delivered" : "In Progress"}
                                </span>
                            </div>
                            
                            {/* Order Items Preview */}
                            <div className="flex gap-4 items-center">
                                {order.orderItems.slice(0, 3).map((item: any, idx: number) => (
                                    <div key={idx} className="w-16 h-16 bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200">
                                        <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                    </div>
                                ))}
                                {order.orderItems.length > 3 && (
                                    <div className="text-xs text-neutral-500">+{order.orderItems.length - 3} more</div>
                                )}
                                
                                <div className="flex-1 text-right">
                                    <p className="text-sm text-neutral-500">Total Amount</p>
                                    <p className="font-bold text-lg text-luxury-dark dark:text-white">
                                        ₹{order.totalPrice.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
              </div>
            )}

            {/* --- ADDRESSES TAB --- */}
            {activeTab === "addresses" && (
                <div className="text-center py-20 text-neutral-500">
                    <MapPin className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>Addresses are managed during checkout.</p>
                </div>
            )}

             {/* --- SETTINGS TAB --- */}
             {activeTab === "settings" && (
                <div className="max-w-md">
                    <h2 className="font-serif text-2xl mb-6">Account Details</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold uppercase text-neutral-500">Full Name</label>
                            <div className="p-3 border rounded-lg bg-neutral-50 dark:bg-white/5 dark:border-white/10">{userInfo.name}</div>
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase text-neutral-500">Email Address</label>
                            <div className="p-3 border rounded-lg bg-neutral-50 dark:bg-white/5 dark:border-white/10">{userInfo.email}</div>
                        </div>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// Menu Button Helper Component
function MenuButton({ icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-5 py-4 w-full text-left rounded-2xl transition-all duration-300 ${
        active 
        ? "bg-luxury-primary text-white shadow-lg" 
        : "text-neutral-600 dark:text-neutral-400 hover:bg-white dark:hover:bg-white/5"
      }`}
    >
      {React.cloneElement(icon, { className: "h-5 w-5" })}
      <span className="font-bold text-sm tracking-wide">{label}</span>
      {active && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
    </button>
  );
}
