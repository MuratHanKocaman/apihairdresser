// Gerekli modülleri dahil et
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerOptions'); // Swagger ayarlarını aldığınız dosya

// Route dosyalarını dahil et
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const settingsRoutes = require('./routes/setttingsRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Middleware'ler
const { verifyToken, isAdmin } = require('./middleware/authMiddleware');

// Uygulama ayarları
dotenv.config();
const app = express();

// Middleware'leri kullan
app.use(cors({
    origin: 'http://localhost:3000', // Frontend'in çalıştığı port
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

// Veritabanına bağlan
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB bağlantısı başarılı');
}).catch((err) => {
    console.error('MongoDB bağlantısı başarısız:', err);
});

// Ana endpoint
app.get('/', (req, res) => {
    res.send('API çalışıyor');
});



// Swagger UI için route ekleyin
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Route tanımlamaları
app.use('/api/auth', authRoutes); // Authentication işlemleri burada
app.use('/api/users', userRoutes); // Kullanıcı işlemleri
app.use('/api/admin', verifyToken, isAdmin, adminRoutes); // Admin işlemleri
app.use('/api/appointments', verifyToken, appointmentRoutes); // Randevu işlemleri
app.use('/api/payments', verifyToken, paymentRoutes); // Ödeme işlemleri
app.use('/api/services', verifyToken, serviceRoutes); // Hizmet işlemleri
app.use('/api/settings', verifyToken, isAdmin, settingsRoutes); // Admin yetkisi gerektiren ayarlar ile ilgili işlemler


// Hataları yakala
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error' });
});

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor`);
});
