const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: {
      type: String,
      required: function () {
        return !this.customerId;
      },
    },
    phone: {
      type: String,
      required: function () {
        return !this.customerId;
      },
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    ],
    appointmentDate: { type: Date, required: true }, // Tek bir tarih olarak ayarlandı
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "canceled"],
      default: "pending",
    },
    notes: { type: String },
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
