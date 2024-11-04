const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true }, // Dakika cinsinden hizmet süresi
  price: { type: Number, required: true },
  description: { type: String },
  serviceType:{ type: String, enum: ['main', 'additional'], default: 'main' }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;