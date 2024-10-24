const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.js');
const { verifyToken } = require('../middleware/authMiddleware.js');

/**
 * @swagger
 * tags:
 *   name: Appointment
 *   description: Appointment management API
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments
 *     description: Retrieve all appointments for the authenticated user.
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of appointments
 *       401:
 *         description: Unauthorized
 */
router.get('/', verifyToken, appointmentController.getAppointments);

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Get a specific appointment
 *     description: Retrieve details of a specific appointment by ID.
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: Appointment details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Appointment not found
 */
router.get('/:id', verifyToken, appointmentController.getAppointmentById);

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     description: Create a new appointment for the authenticated user.
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - time
 *               - service
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Appointment date
 *               time:
 *                 type: string
 *                 description: Appointment time
 *               service:
 *                 type: string
 *                 description: Service to be provided
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', verifyToken, appointmentController.createAppointment);

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Update an appointment
 *     description: Update an existing appointment by ID.
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Appointment date
 *               time:
 *                 type: string
 *                 description: Appointment time
 *               service:
 *                 type: string
 *                 description: Service to be provided
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Appointment not found
 */
router.put('/:id', verifyToken, appointmentController.updateAppointment);

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Delete an appointment
 *     description: Delete an existing appointment by ID.
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: Appointment deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Appointment not found
 */
router.delete('/:id', verifyToken, appointmentController.deleteAppointment);

module.exports = router;