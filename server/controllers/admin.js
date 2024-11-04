const User = require('../models/User');

// Kullanıcının rolünü güncelle (sadece admin yetkisiyle)
exports.updateUserRole = async (req, res, next) => {
  const { userId, role } = req.body;

  try {
    // Kullanıcıyı bul
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Mevcut rolü kontrol et ve geçerli roller arasında olmasını sağla
    const validRoles = ['customer', 'staff'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Kullanıcının rolünü güncelle
    user.role = role;
    await user.save();

    res.status(200).json({ message: 'User role updated successfully', user });
  } catch (error) {
    next(error);
  }
};

// Tüm kullanıcıları listeleme (admin için)
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password'); // Şifreyi dışla
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};


// Tek bir kullanıcı getir
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.query.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Kullanıcıyı sil
exports.deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.query.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};