const Product = require("../models/Product.js");

// Ürün oluştur
exports.addProduct = async (req, res, next) => {
  const { name, description, price, stock, category } = req.body;

  if (!name || !price || !stock || !category) {
    return res
      .status(400)
      .json({ message: "Name, price, stock, and category are required." });
  }

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ürünü güncelle
exports.updateProduct = async (req, res, next) => {
  const { id } = req.query; // Query parametresinden ID al
  const { name, description, price, stock, category } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, stock, category },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ürünü sil
exports.deleteProduct = async (req, res, next) => {
  const { id } = req.query; // Query parametresinden ID al

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tüm ürünleri listele
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tek bir ürün getir
exports.getProductById = async (req, res, next) => {
  const { id } = req.query; // Query parametresinden ID al

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
