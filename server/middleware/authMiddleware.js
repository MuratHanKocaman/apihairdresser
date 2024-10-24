const jwt = require('jsonwebtoken');

// JWT token'ını doğrulayan middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Sonraki middleware ya da route handler'a geç
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
}; 

// Admin yetkisi kontrolü için middleware
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Eğer adminse, devam et
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

// Fonksiyonları dışa aktar
module.exports = { verifyToken, isAdmin };
