const mongoose = require('mongoose');

const siteSettingsSchema = mongoose.Schema({
    storeName: { type: String, default: "AyurLuxe" },
    supportEmail: { type: String, default: "support@example.com" },
    heroTitle: { type: String, default: "Rediscover Nature's Essence" },
    heroSubtitle: { type: String, default: "Authentic Ayurvedic Experience" },
    currencySymbol: { type: String, default: "₹" },
    taxRate: { type: Number, default: 18 },
    shippingCost: { type: Number, default: 99 },
    freeShippingThreshold: { type: Number, default: 999 },
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
