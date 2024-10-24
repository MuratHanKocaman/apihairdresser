const Appointment = require('../models/Appointment.js');

// Tüm randevuları listele
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('customer').populate('staff').populate('service');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tek bir randevu getir
exports.getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('customer').populate('staff').populate('service');
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Yeni randevu oluştur
exports.createAppointment = async (req, res, next) => {
  const { customer, staff, service, appointmentDate, status, notes } = req.body;
  const newAppointment = new Appointment({ customer, staff, service, appointmentDate, status, notes });

  try {
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Randevuyu güncelle
exports.updateAppointment = async (req, res, next) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAppointment) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Randevuyu sil
exports.deleteAppointment = async (req, res, next) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
