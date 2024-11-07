const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true }, // İşletme adı
    address: { type: String, required: true }, // İşletme adresi
    email: { type: String, required: true }, // İşletme e-posta adresi
    phone: { type: String, required: true }, // İletişim numarası
    openingHours: {
      // Açılış saatleri
      monday: {
        open: String,
        close: String,
        closed: { type: Boolean },
      },
      tuesday: {
        open: String,
        close: String,
        closed: { type: Boolean },
      },
      wednesday: {
        open: String,
        close: String,
        closed: { type: Boolean },
      },
      thursday: {
        open: String,
        close: String,
        closed: { type: Boolean },
      },
      friday: {
        open: String,
        close: String,
        closed: { type: Boolean },
      },
      saturday: {
        open: String,
        close: String,
        closed: { type: Boolean },
      },
      sunday: {
        open: String,
        close: String,
        closed: { type: Boolean, default: true },
      },
    },
    socialMedia: {
      // Sosyal medya hesapları
      facebook: { type: String },
      instagram: { type: String },
      twitter: { type: String },
    },
  },
  { timestamps: true }
);

const Settings = mongoose.model("Settings", settingsSchema);
module.exports = Settings;
