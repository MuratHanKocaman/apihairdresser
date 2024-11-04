const Appointment = require('../models/Appointment.js');

// Tüm randevuları listele
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('customerId')
      .populate('staffId')
      .populate('serviceId');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tek bir randevu getir
exports.getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.query.id)
      .populate('customerId')
      .populate('staffId')
      .populate('serviceId');
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Yeni randevu oluştur
exports.createAppointment = async (req, res, next) => {
  const { customerId, name, phone, staffId, serviceId, appointmentDate, status, notes } = req.body;

  if (!customerId && (!name || !phone)) {
    return res.status(400).json({ message: 'Ya customerId ya da isim ve telefon gereklidir' });
  }

  const newAppointment = new Appointment({
    customerId,
    name,
    phone,
    staffId,
    serviceId: Array.isArray(serviceId) ? serviceId : [serviceId],
    appointmentDate: new Date(appointmentDate), // Tek tarih olarak kaydediliyor
    status,
    notes
  });

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
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.query.id, req.body, { new: true });
    if (!updatedAppointment) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Randevuyu sil
exports.deleteAppointment = async (req, res, next) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.query.id);
    if (!deletedAppointment) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
