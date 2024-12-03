const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.js");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware.js");

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management API
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve all products.
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of products
 *       401:
 *         description: Unauthorized
 */
router.get("/", productController.getAllProducts);

/**
 * @swagger
 * /api/products/single:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve details of a specific product by ID.
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.get("/single", verifyToken, productController.getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product.
 *     tags: [Product]
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
 *               - price
 *               - stock
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *               description:
 *                 type: string
 *                 description: Product description
 *               price:
 *                 type: number
 *                 description: Product price
 *               stock:
 *                 type: number
 *                 description: Available stock
 *               category:
 *                 type: string
 *                 description: Product category
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", verifyToken, isAdmin, productController.addProduct);

/**
 * @swagger
 * /api/products:
 *   put:
 *     summary: Update a product
 *     description: Update an existing product by ID.
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *               description:
 *                 type: string
 *                 description: Product description
 *               price:
 *                 type: number
 *                 description: Product price
 *               stock:
 *                 type: number
 *                 description: Available stock
 *               category:
 *                 type: string
 *                 description: Product category
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.put("/", verifyToken, isAdmin, productController.updateProduct);

/**
 * @swagger
 * /api/products:
 *   delete:
 *     summary: Delete a product
 *     description: Delete an existing product by ID.
 *     tags: [Product]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.delete("/", verifyToken, isAdmin, productController.deleteProduct);

module.exports = router;
