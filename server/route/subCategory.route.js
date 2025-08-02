import { Router } from "express";
import auth from "../middleware/auth.js";
import { AddSubCategoryController, deleteSubCategoryController, getSubCategoryController, updateSubCategoryController } from "../controllers/subCategory.controller.js";

const subCategoryRouter = Router()

/**
 * @swagger
 * tags:
 *   name: SubCategories
 *   description: SubCategory management endpoints
 */

/**
 * @swagger
 * /api/subcategory/create:
 *   post:
 *     summary: Create a new subcategory (Admin only)
 *     tags: [SubCategories]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - image
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Fresh Fruits"
 *               image:
 *                 type: string
 *                 example: "https://example.com/fresh-fruits.jpg"
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["60f7b3b3b3b3b3b3b3b3b3b3"]
 *                 description: "Array of category IDs"
 *     responses:
 *       201:
 *         description: SubCategory created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: SubCategory already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
subCategoryRouter.post('/create',auth,AddSubCategoryController)

/**
 * @swagger
 * /api/subcategory/get:
 *   post:
 *     summary: Get subcategories (optionally filtered by category)
 *     tags: [SubCategories]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *                 example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *                 description: "Optional: Filter subcategories by category ID"
 *     responses:
 *       200:
 *         description: SubCategories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "SubCategories retrieved successfully"
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SubCategory'
 */
subCategoryRouter.post('/get',getSubCategoryController)

/**
 * @swagger
 * /api/subcategory/update:
 *   put:
 *     summary: Update a subcategory (Admin only)
 *     tags: [SubCategories]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *             properties:
 *               _id:
 *                 type: string
 *                 example: "60f7b3b3b3b3b3b3b3b3b3b4"
 *               name:
 *                 type: string
 *                 example: "Organic Fruits"
 *               image:
 *                 type: string
 *                 example: "https://example.com/organic-fruits.jpg"
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["60f7b3b3b3b3b3b3b3b3b3b3"]
 *     responses:
 *       200:
 *         description: SubCategory updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: SubCategory not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
subCategoryRouter.put('/update',auth,updateSubCategoryController)

/**
 * @swagger
 * /api/subcategory/delete:
 *   delete:
 *     summary: Delete a subcategory (Admin only)
 *     tags: [SubCategories]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *             properties:
 *               _id:
 *                 type: string
 *                 example: "60f7b3b3b3b3b3b3b3b3b3b4"
 *     responses:
 *       200:
 *         description: SubCategory deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: SubCategory not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
subCategoryRouter.delete('/delete',auth,deleteSubCategoryController)

export default subCategoryRouter