const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settings.js");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware.js");

/**
 * @swagger
 * tags:
 *   name: Settings
 *   description: Ayarlar yönetim API'si
 */

/**
 * @swagger
 * /api/settings:
 *   get:
 *     summary: Tüm ayarları getir
 *     description: Kimliği doğrulanmış kullanıcı için tüm ayarları getirir.
 *     tags: [Settings]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Ayarların listesi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Ayar ID'si
 *                   businessName:
 *                     type: string
 *                     description: İşletme adı
 *                   address:
 *                     type: string
 *                     description: İşletme adresi
 *                   email:
 *                     type: string
 *                     description: İletişim e-posta adresi
 *                   phone:
 *                     type: string
 *                     description: İletişim numarası
 *                   openingHours:
 *                     type: object
 *                     description: İşletme açılış saatleri
 *                   socialMedia:
 *                     type: object
 *                     description: Sosyal medya hesapları
 *       401:
 *         description: Yetkisiz
 */
router.get("/", verifyToken, settingsController.getSettings);

/**
 * @swagger
 * /api/settings/create:
 *   post:
 *     summary: Yeni bir ayar oluştur
 *     description: Kimliği doğrulanmış kullanıcı için yeni bir ayar oluşturur.
 *     tags: [Settings]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - businessName
 *               - address
 *               - email
 *               - phone
 *             properties:
 *               businessName:
 *                 type: string
 *                 description: İşletme adı
 *               address:
 *                 type: string
 *                 description: İşletme adresi
 *               email:
 *                 type: string
 *                 description: İşletme e-posta adresi
 *               phone:
 *                 type: string
 *                 description: İletişim numarası
 *               openingHours:
 *                 type: object
 *                 description: İşletme açılış saatleri
 *               socialMedia:
 *                 type: object
 *                 description: Sosyal medya hesapları
 *     responses:
 *       201:
 *         description: Ayar başarıyla oluşturuldu
 *       400:
 *         description: Geçersiz giriş
 *       401:
 *         description: Yetkisiz
 *       500:
 *         description: Sunucu hatası
 */
router.post("/create", isAdmin, verifyToken, settingsController.createSettings);

/**
 * @swagger
 * /api/settings:
 *   put:
 *     summary: Bir ayarı güncelle
 *     description: ID ile mevcut bir ayarı günceller.
 *     tags: [Settings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Ayar ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               businessName:
 *                 type: string
 *                 description: İşletme adı
 *               address:
 *                 type: string
 *                 description: İşletme adresi
 *               email:
 *                 type: string
 *                 description: İletişim e-posta adresi
 *               phone:
 *                 type: string
 *                 description: İletişim numarası
 *               openingHours:
 *                 type: object
 *                 description: İşletme açılış saatleri
 *               socialMedia:
 *                 type: object
 *                 description: Sosyal medya hesapları
 *     responses:
 *       200:
 *         description: Ayar başarıyla güncellendi
 *       400:
 *         description: Geçersiz giriş
 *       401:
 *         description: Yetkisiz
 *       404:
 *         description: Ayar bulunamadı
 */
router.put("/", isAdmin, verifyToken, settingsController.updateSettings);

/**
 * @swagger
 * /api/settings:
 *   delete:
 *     summary: Bir ayarı sil
 *     description: ID ile mevcut bir ayarı siler.
 *     tags: [Settings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Ayar ID'si
 *     responses:
 *       200:
 *         description: Ayar başarıyla silindi
 *       401:
 *         description: Yetkisiz
 *       404:
 *         description: Ayar bulunamadı
 */
router.delete("/", isAdmin, verifyToken, settingsController.deleteSettings);

module.exports = router;
