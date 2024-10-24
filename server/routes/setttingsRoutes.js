const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settings.js');
const { verifyToken } = require('../middleware/authMiddleware.js');

/**
 * @swagger
 * tags:
 *   name: Settings
 *   description: Settings management API
 */

/**
 * @swagger
 * /settings:
 *   get:
 *     summary: Get all settings
 *     description: Retrieve all settings for the authenticated user.
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of settings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The settings ID
 *                   name:
 *                     type: string
 *                     description: The name of the setting
 *                   value:
 *                     type: string
 *                     description: The value of the setting
 *       401:
 *         description: Unauthorized
 */
router.get('/', verifyToken, settingsController.getSettings);

/**
 * @swagger
 * /settings/{id}:
 *   put:
 *     summary: Update a setting
 *     description: Update an existing setting by ID.
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Settings ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Setting name
 *               value:
 *                 type: string
 *                 description: Setting value
 *     responses:
 *       200:
 *         description: Setting updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Setting not found
 */
router.put('/:id', verifyToken, settingsController.updateSettings);

/**
 * @swagger
 * /settings/{id}:
 *   delete:
 *     summary: Delete a setting
 *     description: Delete an existing setting by ID.
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Settings ID
 *     responses:
 *       200:
 *         description: Setting deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Setting not found
 */
router.delete('/:id', verifyToken, settingsController.deleteSettings);

module.exports = router;
