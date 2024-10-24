const Payment = require('../models/Payment.js');

// Tüm ödemeleri listele
exports.getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find().populate('appointment');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tek bir ödeme getir
exports.getPaymentById = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('appointment');
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Yeni ödeme oluştur
exports.createPayment = async (req, res, next) => {
  const { appointment, amount, method, status } = req.body;
  const newPayment = new Payment({ appointment, amount, method, status });

  try {
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ödemeyi güncelle
exports.updatePayment = async (req, res, next) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPayment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ödemeyi sil
exports.deletePayment = async (req, res, next) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
    if (!deletedPayment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json({ message: 'Payment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Belirli bir ayda yapılan ödemeleri getir ve toplamını hesapla
exports.getMonthlyPayments = async (req, res, next) => {
    const { month, year } = req.query; // Ay ve yıl bilgilerini query'den alıyoruz
  
    if (!month || !year) {
      return res.status(400).json({ message: 'Month and year are required' });
    }
  
    try {
      // Başlangıç ve bitiş tarihlerini ayarlıyoruz
      const startDate = new Date(year, month - 1, 1); // Ayın ilk günü
      const endDate = new Date(year, month, 1); // Bir sonraki ayın ilk günü
  
      // Veritabanından belirtilen tarihler arasındaki ödemeleri getiriyoruz
      const payments = await Payment.find({
        paymentDate: {
          $gte: startDate,
          $lt: endDate
        }
      });
  
      if (payments.length === 0) {
        return res.status(404).json({ message: 'No payments found for the specified month' });
      }
  
      // Toplam ödemeyi hesapla
      const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  
      // Ödemelerle birlikte toplam değeri döndür
      res.status(200).json({
        totalAmount,
        payments
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
