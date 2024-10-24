const Settings = require('../models/Settings.js');

// Ayarları getir
exports.getSettings = async (req, res, next) => {
  try {
    const settings = await Settings.find();
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ayarları güncelle
exports.updateSettings = async (req, res, next) => {
  try {
    const updatedSettings = await Settings.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSettings) return res.status(404).json({ message: 'Settings not found' });
    res.status(200).json(updatedSettings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ayarları sil
exports.deleteSettings = async (req, res, next) => {
  try {
    const deletedSettings = await Settings.findByIdAndDelete(req.params.id);
    if (!deletedSettings) return res.status(404).json({ message: 'Settings not found' });
    res.status(200).json({ message: 'Settings deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
