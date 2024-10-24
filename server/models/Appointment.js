const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Müşteri
  staff: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Kuaför
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }, // Hizmet türü
  appointmentDate: { type: Date, required: true }, // Randevu tarihi ve saati
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'canceled'], default: 'pending' },
  notes: { type: String }, // Müşteri istekleri, özel notlar
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;