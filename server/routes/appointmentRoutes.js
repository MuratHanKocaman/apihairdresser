const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointment.js");
const { verifyToken } = require("../middleware/authMiddleware.js");

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment management API
 */

// Tüm randevuları listele
/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Get all appointments
 *     description: Retrieve a list of all appointments.
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of appointments
 *       401:
 *         description: Unauthorized
 */
router.get("/", appointmentController.getAppointments);

// Tek bir randevuyu getir
/**
 * @swagger
 * /api/appointments/appointment:
 *   get:
 *     summary: Get appointment by ID
 *     description: Retrieve a single appointment by its ID.
 *     tags: [Appointments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the appointment to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved appointment
 *       404:
 *         description: Appointment not found
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/appointment",
  verifyToken,
  appointmentController.getAppointmentById
);

// Yeni randevu oluştur
/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Yeni bir randevu oluştur
 *     description: Yeni bir randevu oluşturmak için, ya kullanıcı ID'si ya da isim ve telefon bilgisi gereklidir.
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *                 description: Müşteri ID'si (isim ve telefon verildiğinde isteğe bağlı)
 *               name:
 *                 type: string
 *                 description: Müşteri ismi (customerId yoksa zorunlu)
 *               phone:
 *                 type: string
 *                 description: Müşteri telefon numarası (customerId yoksa zorunlu)
 *               staffId:
 *                 type: string
 *                 description: Personel ID'si (zorunlu)
 *               serviceId:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Hizmet ID'lerinin listesi
 *               appointmentDate:
 *                 type: string
 *                 format: date-time
 *                 description: Randevu tarihi ve saati
 *               status:
 *                 type: string
 *                 description: Randevu durumu (isteğe bağlı)
 *               notes:
 *                 type: string
 *                 description: Ek notlar (isteğe bağlı)
 *     responses:
 *       201:
 *         description: Randevu başarıyla oluşturuldu
 *       400:
 *         description: Hatalı istek
 *       401:
 *         description: Yetkisiz erişim
 */
router.post("/", appointmentController.createAppointment);

// Randevuyu güncelle
/**
 * @swagger
 * /api/appointments/update:
 *   put:
 *     summary: Update an appointment
 *     description: Update an existing appointment by its ID.
 *     tags: [Appointments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the appointment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *                 description: Updated customer ID (optional)
 *               name:
 *                 type: string
 *                 description: Updated name (required if customerId is not provided)
 *               phone:
 *                 type: string
 *                 description: Updated phone number (required if customerId is not provided)
 *               staffId:
 *                 type: string
 *                 description: Updated staff ID
 *               serviceId:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of updated service IDs
 *               appointmentDate:
 *                 type: string
 *                 format: date-time
 *                 description: Updated appointment date and time (ISO 8601 format)
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, completed, canceled]
 *                 description: Updated status of the appointment
 *               notes:
 *                 type: string
 *                 description: Updated notes
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Appointment not found
 *       401:
 *         description: Unauthorized
 */
router.put("/update", verifyToken, appointmentController.updateAppointment);

// Randevuyu sil
/**
 * @swagger
 * /api/appointments/delete:
 *   delete:
 *     summary: Delete an appointment
 *     description: Delete an appointment by its ID.
 *     tags: [Appointments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the appointment to delete
 *     responses:
 *       200:
 *         description: Appointment deleted successfully
 *       404:
 *         description: Appointment not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/delete", verifyToken, appointmentController.deleteAppointment);

module.exports = router;
