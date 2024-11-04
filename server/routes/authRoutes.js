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
 * /api/auth/login:
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
 * /api/auth/logout:
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


module.exports = router;
