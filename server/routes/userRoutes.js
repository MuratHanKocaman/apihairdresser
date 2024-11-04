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
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the profile information of the authenticated user.
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
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
 * /api/user/profile:
 *   put:
 *     summary: Update user profile
 *     description: Update the profile information (name, email, and phone) of the authenticated user.
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name
 *               email:
 *                 type: string
 *                 description: The new email address
 *               phone:
 *                 type: string
 *                 description: The new phone number
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


/**
 * @swagger
 * /api/user/staff:
 *   get:
 *     summary: Get all staff members
 *     description: Retrieve a list of all staff members.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of staff members
 */
router.get('/staff', userController.getAllStaff);




module.exports = router;
