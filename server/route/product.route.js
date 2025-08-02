import { Router } from 'express'
import auth from '../middleware/auth.js'
import { createProductController, deleteProductDetails, getProductByCategory, getProductByCategoryAndSubCategory, getProductController, getProductDetails, searchProduct, updateProductDetails } from '../controllers/product.controller.js'
import { admin } from '../middleware/Admin.js'

const productRouter = Router()

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /api/product/create:
 *   post:
 *     summary: Create a new product (Admin only)
 *     tags: [Products]
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
 *               - category
 *               - subCategory
 *               - unit
 *               - stock
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Fresh Apples"
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://example.com/apple1.jpg", "https://example.com/apple2.jpg"]
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["60f7b3b3b3b3b3b3b3b3b3b3"]
 *               subCategory:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["60f7b3b3b3b3b3b3b3b3b3b4"]
 *               unit:
 *                 type: string
 *                 example: "kg"
 *               stock:
 *                 type: number
 *                 example: 100
 *               price:
 *                 type: number
 *                 example: 5.99
 *               discount:
 *                 type: number
 *                 example: 10
 *               description:
 *                 type: string
 *                 example: "Fresh and crispy apples"
 *               more_details:
 *                 type: object
 *                 example: {"origin": "Kashmir", "organic": true}
 *               publish:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Product created successfully
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
 *       403:
 *         description: Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
productRouter.post("/create",auth,admin,createProductController)

/**
 * @swagger
 * /api/product/get:
 *   post:
 *     summary: Get products with pagination
 *     tags: [Products]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: number
 *                 example: 1
 *               limit:
 *                 type: number
 *                 example: 10
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Products retrieved successfully"
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
productRouter.post('/get',getProductController)

/**
 * @swagger
 * /api/product/get-product-by-category:
 *   post:
 *     summary: Get products by category
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryId
 *             properties:
 *               categoryId:
 *                 type: string
 *                 example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *               page:
 *                 type: number
 *                 example: 1
 *               limit:
 *                 type: number
 *                 example: 10
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Products retrieved successfully"
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
productRouter.post("/get-product-by-category",getProductByCategory)

/**
 * @swagger
 * /api/product/get-pruduct-by-category-and-subcategory:
 *   post:
 *     summary: Get products by category and subcategory
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryId
 *               - subCategoryId
 *             properties:
 *               categoryId:
 *                 type: string
 *                 example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *               subCategoryId:
 *                 type: string
 *                 example: "60f7b3b3b3b3b3b3b3b3b3b4"
 *               page:
 *                 type: number
 *                 example: 1
 *               limit:
 *                 type: number
 *                 example: 10
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Products retrieved successfully"
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
productRouter.post('/get-pruduct-by-category-and-subcategory',getProductByCategoryAndSubCategory)

/**
 * @swagger
 * /api/product/get-product-details:
 *   post:
 *     summary: Get product details by ID
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "60f7b3b3b3b3b3b3b3b3b3b5"
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product details retrieved successfully"
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
productRouter.post('/get-product-details',getProductDetails)

/**
 * @swagger
 * /api/product/update-product-details:
 *   put:
 *     summary: Update product details (Admin only)
 *     tags: [Products]
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
 *                 example: "60f7b3b3b3b3b3b3b3b3b3b5"
 *               name:
 *                 type: string
 *                 example: "Fresh Apples"
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *               subCategory:
 *                 type: array
 *                 items:
 *                   type: string
 *               unit:
 *                 type: string
 *                 example: "kg"
 *               stock:
 *                 type: number
 *                 example: 100
 *               price:
 *                 type: number
 *                 example: 5.99
 *               discount:
 *                 type: number
 *                 example: 10
 *               description:
 *                 type: string
 *                 example: "Fresh and crispy apples"
 *               more_details:
 *                 type: object
 *               publish:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Product updated successfully
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
 *       403:
 *         description: Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
//update product
productRouter.put('/update-product-details',auth,admin,updateProductDetails)

/**
 * @swagger
 * /api/product/delete-product:
 *   delete:
 *     summary: Delete a product (Admin only)
 *     tags: [Products]
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
 *                 example: "60f7b3b3b3b3b3b3b3b3b3b5"
 *     responses:
 *       200:
 *         description: Product deleted successfully
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
 *       403:
 *         description: Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
//delete product
productRouter.delete('/delete-product',auth,admin,deleteProductDetails)

/**
 * @swagger
 * /api/product/search-product:
 *   post:
 *     summary: Search products by name or description
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - search
 *             properties:
 *               search:
 *                 type: string
 *                 example: "apple"
 *               page:
 *                 type: number
 *                 example: 1
 *               limit:
 *                 type: number
 *                 example: 10
 *     responses:
 *       200:
 *         description: Search results retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Search results"
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
//search product 
productRouter.post('/search-product',searchProduct)

export default productRouter