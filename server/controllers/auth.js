const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Kullanıcı Kaydı (Register)
exports.register = async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  try {
    // Kullanıcının zaten kayıtlı olup olmadığını kontrol et
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur (role otomatik olarak 'user' olacak)
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role: 'user' // Varsayılan role 'user' olarak atanıyor
    });

    // Kullanıcıyı kaydet
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
};

// Kullanıcı Girişi (Login)
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Şifreyi doğrula
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // JWT token oluştur
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token süresi 1 saat
    );

    // Token'ı cookie'ye ekle (HTTP-Only ve Secure)
    res.cookie('token', token, {
      httpOnly: true, // JavaScript ile erişilemez
      secure: process.env.NODE_ENV === 'production', // Sadece HTTPS üzerinden iletilir
      sameSite: 'strict', // CSRF saldırılarını önlemek için
      maxAge: 3600000 // Cookie'nin geçerlilik süresi (1 saat)
    });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// Token Doğrulama (JWT Authentication)
exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Cookie'den token'ı al

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Token'dan gelen kullanıcı bilgilerini request'e ekle
    next(); // Sonraki middleware'e geç
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


// Kullanıcı Çıkışı (Logout)
exports.logout = (req, res) => {
  res.clearCookie('token'); // Token'ı cookie'den temizle
  res.status(200).json({ message: 'Logout successful' });
};