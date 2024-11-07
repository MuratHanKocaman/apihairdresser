const Service = require("../models/Service.js");

// Tüm hizmetleri listele
exports.getServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tek bir hizmet getir
exports.getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.query.id);
    console.log(service);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Yeni hizmet oluştur
exports.createService = async (req, res, next) => {
  const { name, duration, price, description, serviceType } = req.body;
  const newService = new Service({
    name,
    duration,
    price,
    description,
    serviceType,
  });

  try {
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Hizmeti güncelle
exports.updateService = async (req, res, next) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.body.id,
      req.body,
      { new: true }
    );
    if (!updatedService)
      return res.status(404).json({ message: "Service not found" });
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Hizmeti sil
exports.deleteService = async (req, res, next) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.query.id);
    if (!deletedService)
      return res.status(404).json({ message: "Service not found" });
    res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
