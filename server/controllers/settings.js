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

// Yeni bir ayar oluşturma metodu
exports.createSettings = async (req, res) => {
  try {
    // İstek gövdesinden gelen verileri alın
    const { businessName, address, email, phone, openingHours, socialMedia } = req.body;

    // Eksik alanların kontrolü
    if (!businessName || !address || !email || !phone) {
      return res.status(400).json({ message: 'İşletme adı, adres, e-posta ve telefon alanları zorunludur.' });
    }

    // Yeni bir ayar belgesi oluştur
    const newSettings = new Settings({
      businessName,
      address,
      email,
      phone,
      openingHours,
      socialMedia,
    });

    // Ayarı veritabanına kaydet
    const savedSettings = await newSettings.save();

    // Başarı mesajı ile yanıt ver
    res.status(201).json({
      message: 'Ayar başarıyla oluşturuldu.',
      data: savedSettings,
    });
  } catch (error) {
    // Hata durumunda yanıt ver
    res.status(500).json({ message: 'Sunucu hatası. Ayar oluşturulamadı.', error: error.message });
  }
};

// Ayarları güncelle
exports.updateSettings = async (req, res, next) => {
  try {
    const updatedSettings = await Settings.findByIdAndUpdate(req.query.id, req.body, { new: true });
    if (!updatedSettings) return res.status(404).json({ message: 'Settings not found' });
    res.status(200).json(updatedSettings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ayarları sil
exports.deleteSettings = async (req, res, next) => {
  try {
    const deletedSettings = await Settings.findByIdAndDelete(req.query.id);
    if (!deletedSettings) return res.status(404).json({ message: 'Settings not found' });
    res.status(200).json({ message: 'Settings deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
