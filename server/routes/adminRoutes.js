const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.js'); // Admin controller
const { verifyToken, isAdmin } = require('../middleware/authMiddleware.js'); // Auth ve Admin middleware

// Admin yetkisi olan rotalar
router.use(verifyToken); // Admin rotalarına girmeden önce token doğrulaması yapılır

// Tüm kullanıcıları listeleme (admin)
/**
 * @swagger
 * /api/admin:
 *   get:
 *     summary: Get all users (Admin only)
 *     description: Retrieve a list of all users.
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user list
 *       403:
 *         description: Forbidden, Admin access only
 */
router.get('/', isAdmin, adminController.getAllUsers); // Admin yetkisi kontrolü

// Kullanıcının rolünü güncelleme (admin)
/**
 * @swagger
 * /api/admin/update-role:
 *   put:
 *     summary: Update user role (Admin only)
 *     description: Update the role of a user.
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user
 *               role:
 *                 type: string
 *                 description: New role for the user (e.g., 'user', 'admin')
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       403:
 *         description: Forbidden, Admin access only
 */
router.put('/update-role', isAdmin, adminController.updateUserRole); // Admin yetkisi kontrolü

// Tek bir kullanıcıyı ID ile getir (admin)
/**
 * @swagger
 * /api/admin/user:
 *   get:
 *     summary: Get user by ID (Admin only)
 *     description: Retrieve a single user by their ID.
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       403:
 *         description: Forbidden, Admin access only
 *       404:
 *         description: User not found
 */
router.get('/user', isAdmin, adminController.getUserById); // Admin yetkisi kontrolü ve query'den ID alımı


// Kullanıcıyı silme (admin)
/**
 * @swagger
 * /api/admin/delete:
 *   delete:
 *     summary: Delete user by ID (Admin only)
 *     description: Delete a user by their ID.
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       403:
 *         description: Forbidden, Admin access only
 *       404:
 *         description: User not found
 */
router.delete('/delete', isAdmin, adminController.deleteUser); // Admin yetkisi kontrolü ve query'den ID alımı

module.exports = router;
