const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.js');
const { verifyToken,isAdmin } = require('../middleware/authMiddleware.js');

/**
 * @swagger
 * tags:
 *   name: Service
 *   description: Service management API
 */

/**
 * @swagger
 * /api/services/all:
 *   get:
 *     summary: Get all services
 *     description: Retrieve all services for the authenticated user.
 *     tags: [Service]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of services
 *       401:
 *         description: Unauthorized
 */
router.get('/all', serviceController.getServices);

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get a specific service
 *     description: Retrieve details of a specific service by ID.
 *     tags: [Service]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
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
router.get('/', verifyToken, isAdmin, serviceController.getServiceById);

/**
 * @swagger
 * /api/services/create:
 *   post:
 *     summary: Create a new service
 *     description: Create a new service for the authenticated user.
 *     tags: [Service]
 *     security:
 *       - BearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - duration
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 description: Service name
 *               duration:
 *                 type: number
 *                 description: Duration of the service in minutes
 *               price:
 *                 type: number
 *                 description: Service price
 *               description:
 *                 type: string
 *                 description: Additional information about the service
 *     responses:
 *       201:
 *         description: Service created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/create',verifyToken, isAdmin, serviceController.createService);

/**
 * @swagger
 * /api/services/update:
 *   put:
 *     summary: Update a service
 *     description: Update an existing service by ID.
 *     tags: [Service]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - duration
 *               - price
 *             properties:
 *               id:
 *                 type: string
 *                 description: Service id
 *               name:
 *                 type: string
 *                 description: Service name
 *               duration:
 *                 type: number
 *                 description: Duration of the service in minutes
 *               price:
 *                 type: number
 *                 description: Service price
 *               description:
 *                 type: string
 *                 description: Additional information about the service
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
router.put('/update',verifyToken, isAdmin, serviceController.updateService);

/**
 * @swagger
 * /api/services:
 *   delete:
 *     summary: Delete a service
 *     description: Delete an existing service by ID.
 *     tags: [Service]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
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
router.delete('/',verifyToken, isAdmin, serviceController.deleteService);

module.exports = router;
