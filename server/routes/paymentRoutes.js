const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.js');
const { verifyToken } = require('../middleware/authMiddleware.js');

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment management API
 */

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all payments
 *     description: Retrieve all payments for the authenticated user.
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of payments
 *       401:
 *         description: Unauthorized
 */
router.get('/', verifyToken, paymentController.getPayments);

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get a specific payment
 *     description: Retrieve details of a specific payment by ID.
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Payment not found
 */
router.get('/:id', verifyToken, paymentController.getPaymentById);

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a new payment
 *     description: Create a new payment for the authenticated user.
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - method
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Payment amount
 *               method:
 *                 type: string
 *                 description: Payment method (e.g., credit card, cash)
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', verifyToken, paymentController.createPayment);

/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     summary: Update a payment
 *     description: Update an existing payment by ID.
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Payment amount
 *               method:
 *                 type: string
 *                 description: Payment method (e.g., credit card, cash)
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Payment not found
 */
router.put('/:id', verifyToken, paymentController.updatePayment);

/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     summary: Delete a payment
 *     description: Delete an existing payment by ID.
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Payment not found
 */
router.delete('/:id', verifyToken, paymentController.deletePayment);

/**
 * @swagger
 * /payments/monthly:
 *   get:
 *     summary: Get payments for a specific month
 *     description: Retrieve all payments made in a specific month and calculate the total.
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Month in the format YYYY-MM (e.g., 2024-10)
 *     responses:
 *       200:
 *         description: A list of monthly payments and the total
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.get('/monthly', verifyToken, paymentController.getMonthlyPayments);

module.exports = router;
