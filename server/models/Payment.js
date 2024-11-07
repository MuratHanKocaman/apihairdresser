const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    amount: { type: Number, required: true }, // Ödenen tutar
    paymentDate: { type: Date, default: Date.now }, // Ödeme tarihi
    method: {
      type: String,
      enum: ["credit_card", "cash"],
      required: true,
      default: "cash",
    }, // Ödeme yöntemi
    status: {
      type: String,
      enum: ["paid", "pending", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
