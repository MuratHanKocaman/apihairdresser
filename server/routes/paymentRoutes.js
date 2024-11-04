const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.js");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware.js");

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment management API
 */

/**
 * @swagger
 * /api/payments:
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
router.get("/", verifyToken, isAdmin, paymentController.getPayments);

/**
 * @swagger
 * /api/payments/payment:
 *   get:
 *     summary: Get a specific payment
 *     description: Retrieve details of a specific payment by ID.
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
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
router.get("/payment", verifyToken, isAdmin, paymentController.getPaymentById);

/**
 * @swagger
 * /api/payments:
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
 *               - appointment
 *               - amount
 *               - method
 *             properties:
 *               appointment:
 *                 type: string
 *                 description: Appointment ID (required)
 *               amount:
 *                 type: number
 *                 description: Payment amount
 *               method:
 *                 type: string
 *                 description: Payment method (e.g., credit card, cash)
 *               status:
 *                 type: string
 *                 description: Payment status (optional)
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", verifyToken, isAdmin, paymentController.createPayment);

/**
 * @swagger
 * /api/payments/update:
 *   put:
 *     summary: Update a payment
 *     description: Update an existing payment by ID.
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
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
 *             required:
 *               - appointment
 *               - amount
 *               - method
 *             properties:
 *               appointment:
 *                 type: string
 *                 description: Appointment ID (required)
 *               amount:
 *                 type: number
 *                 description: Payment amount
 *               method:
 *                 type: string
 *                 description: Payment method (e.g., credit card, cash)
 *               status:
 *                 type: string
 *                 description: Payment status (optional)
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
router.put("/update", verifyToken, isAdmin, paymentController.updatePayment);

/**
 * @swagger
 * /api/payments/delete:
 *   delete:
 *     summary: Delete a payment
 *     description: Delete an existing payment by ID.
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
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
router.delete("/delete", verifyToken, isAdmin, paymentController.deletePayment);

/**
 * @swagger
 * /api/payments/monthly:
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
 *           type: integer
 *         required: true
 *         description: Month in numeric format (1-12)
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Year in four-digit format (e.g., 2024)
 *     responses:
 *       200:
 *         description: A list of monthly payments and the total amount
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalAmount:
 *                   type: number
 *                   description: Total payment amount for the month
 *       400:
 *         description: Invalid or missing month/year
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/monthly",
  verifyToken,
  isAdmin,
  paymentController.getMonthlyPayments
);

module.exports = router;
