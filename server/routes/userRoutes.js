const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js');
const { verifyToken } = require('../middleware/authMiddleware.js');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User profile management API
 */

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the profile information of the authenticated user.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID
 *                 username:
 *                   type: string
 *                   description: The username
 *                 email:
 *                   type: string
 *                   description: The user's email address
 *       401:
 *         description: Unauthorized
 */
router.get('/profile', verifyToken, userController.getProfile);

/**
 * @swagger
 * /user/profile:
 *   put:
 *     summary: Update user profile
 *     description: Update the profile information of the authenticated user.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The new username
 *               email:
 *                 type: string
 *                 description: The new email address
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.put('/profile', verifyToken, userController.updateProfile);

module.exports = router;
