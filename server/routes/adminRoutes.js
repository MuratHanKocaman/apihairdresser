const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.js'); // Admin controller
const { verifyToken, isAdmin } = require('../middleware/authMiddleware.js'); // Auth ve Admin middleware

// Admin yetkisi olan rotalar
router.use(verifyToken); // Admin rotalarına girmeden önce token doğrulaması yapılır

// Tüm kullanıcıları listeleme (admin)
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (Admin only)
 *     description: Retrieve a list of all users
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user list
 *       403:
 *         description: Forbidden, Admin access only
 */
router.get('/users', isAdmin, adminController.getAllUsers); // Admin yetkisi kontrolü

// Kullanıcının rolünü güncelleme (admin)
/**
 * @swagger
 * /users/update-role:
 *   put:
 *     summary: Update user role (Admin only)
 *     description: Update the role of a user
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       403:
 *         description: Forbidden, Admin access only
 */
router.put('/users/update-role', isAdmin, adminController.updateUserRole); // Admin yetkisi kontrolü

module.exports = router;
