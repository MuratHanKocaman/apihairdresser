const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Ürün adı zorunlu
    },
    description: {
      type: String,
      default: "", // Ürün açıklaması isteğe bağlı
    },
    price: {
      type: Number,
      required: true, // Ürün fiyatı zorunlu
    },
    stock: {
      type: Number,
      required: true, // Ürün stoğu zorunlu
      min: 0, // Stoğun negatif olmasını önlemek için minimum değer
    },
    category: {
      type: String,
      required: true, // Ürün kategorisi zorunlu
    },
    createdAt: {
      type: Date,
      default: Date.now, // Ürünün oluşturulma tarihi
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
