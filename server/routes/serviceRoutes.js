const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.js');
const { verifyToken } = require('../middleware/authMiddleware.js');

/**
 * @swagger
 * tags:
 *   name: Service
 *   description: Service management API
 */

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all services
 *     description: Retrieve all services for the authenticated user.
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of services
 *       401:
 *         description: Unauthorized
 */
router.get('/', verifyToken, serviceController.getServices);

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Get a specific service
 *     description: Retrieve details of a specific service by ID.
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Service ID
 *     responses:
 *       200:
 *         description: Service details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Service not found
 */
router.get('/:id', verifyToken, serviceController.getServiceById);

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Create a new service
 *     description: Create a new service for the authenticated user.
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 description: Service name
 *               price:
 *                 type: number
 *                 description: Service price
 *     responses:
 *       201:
 *         description: Service created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/', verifyToken, serviceController.createService);

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Update a service
 *     description: Update an existing service by ID.
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Service ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Service name
 *               price:
 *                 type: number
 *                 description: Service price
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Service not found
 */
router.put('/:id', verifyToken, serviceController.updateService);

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Delete a service
 *     description: Delete an existing service by ID.
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Service ID
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Service not found
 */
router.delete('/:id', verifyToken, serviceController.deleteService);

module.exports = router;
