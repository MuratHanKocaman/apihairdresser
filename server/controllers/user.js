const User = require('../models/User.js');


// Kullanıcının kendi profilini görüntüleme
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-password -createdAt -updatedAt -__v'); // İstenmeyen alanları hariç tut

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};


// Kullanıcı profilini güncelleme
exports.updateProfile = async (req, res, next) => {
  const { name, email, phone } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Sadece name, email ve phone alanlarını güncelle
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    await user.save();

    // Güncellenmiş kullanıcı bilgisini istenmeyen alanlar olmadan yanıtla
    const updatedUser = await User.findById(req.user.userId)
      .select('-password -createdAt -updatedAt -__v');

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    next(error);
  }
};

// Tüm kuaförleri getirme
exports.getAllStaff = async (req, res) => {
  try {
    // Role'ü 'staff' olan tüm kullanıcıları getir
    const staffMembers = await User.find({ role: 'staff' });
    res.status(200).json(staffMembers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
