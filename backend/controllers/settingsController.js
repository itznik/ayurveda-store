const SiteSettings = require('../models/SiteSettings');

const getSettings = async (req, res) => {
    let settings = await SiteSettings.findOne();
    if (!settings) {
        settings = await SiteSettings.create({});
    }
    res.json(settings);
};

const updateSettings = async (req, res) => {
    let settings = await SiteSettings.findOne();
    if (!settings) {
        settings = await SiteSettings.create({});
    }

    settings.storeName = req.body.storeName || settings.storeName;
    settings.supportEmail = req.body.supportEmail || settings.supportEmail;
    settings.currencySymbol = req.body.currencySymbol || settings.currencySymbol;
    if (req.body.taxRate !== undefined) settings.taxRate = req.body.taxRate;
    if (req.body.shippingCost !== undefined) settings.shippingCost = req.body.shippingCost;
    if (req.body.freeShippingThreshold !== undefined) settings.freeShippingThreshold = req.body.freeShippingThreshold;

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
};

module.exports = { getSettings, updateSettings };
