const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.js'); // Auth controller
const { verifyToken } = require('../middleware/authMiddleware.js'); // Auth middleware

// Kullanıcı kaydı (Register)
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user in the system
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists or invalid data
 */
router.post('/register', authController.register);

// Kullanıcı girişi (Login)
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: User login and receive a token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 */
router.post('/login', authController.login);

// Kullanıcı çıkışı (Logout)
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: User logout
 *     description: Logout the user
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.post('/logout', authController.logout);

// Token doğrulama (verifyToken middleware kullanarak)
/**
 * @swagger
 * /verify:
 *   get:
 *     summary: Verify JWT token
 *     description: Verify if the provided token is valid
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Invalid or expired token
 */
router.get('/verify', verifyToken, authController.verifyToken);

module.exports = router;
