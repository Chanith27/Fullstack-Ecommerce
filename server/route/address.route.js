import { Router } from 'express'
import auth from '../middleware/auth.js'
import { addAddressController, deleteAddresscontroller, getAddressController, updateAddressController } from '../controllers/address.controller.js'

const addressRouter = Router()

/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: User address management endpoints
 */

/**
 * @swagger
 * /api/address/create:
 *   post:
 *     summary: Add a new address
 *     tags: [Addresses]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address_line
 *               - city
 *               - state
 *               - country
 *               - pincode
 *               - mobile
 *             properties:
 *               address_line:
 *                 type: string
 *                 example: "123 Main Street, Apt 4B"
 *               city:
 *                 type: string
 *                 example: "Colombo"
 *               state:
 *                 type: string
 *                 example: "Western Province"
 *               country:
 *                 type: string
 *                 example: "Sri Lanka"
 *               pincode:
 *                 type: string
 *                 example: "00100"
 *               mobile:
 *                 type: string
 *                 example: "+94771234567"
 *     responses:
 *       201:
 *         description: Address added successfully
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
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
addressRouter.post('/create',auth,addAddressController)

/**
 * @swagger
 * /api/address/get:
 *   get:
 *     summary: Get user's addresses
 *     tags: [Addresses]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Addresses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Addresses retrieved successfully"
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Address'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
addressRouter.get("/get",auth,getAddressController)

/**
 * @swagger
 * /api/address/update:
 *   put:
 *     summary: Update an existing address
 *     tags: [Addresses]
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
 *                 example: "60f7b3b3b3b3b3b3b3b3b3b7"
 *               address_line:
 *                 type: string
 *                 example: "456 New Street, Apt 2A"
 *               city:
 *                 type: string
 *                 example: "Kandy"
 *               state:
 *                 type: string
 *                 example: "Central Province"
 *               country:
 *                 type: string
 *                 example: "Sri Lanka"
 *               pincode:
 *                 type: string
 *                 example: "20000"
 *               mobile:
 *                 type: string
 *                 example: "+94771234567"
 *     responses:
 *       200:
 *         description: Address updated successfully
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
 *         description: Address not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
addressRouter.put('/update',auth,updateAddressController)

/**
 * @swagger
 * /api/address/disable:
 *   delete:
 *     summary: Delete/disable an address
 *     tags: [Addresses]
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
 *                 example: "60f7b3b3b3b3b3b3b3b3b3b7"
 *     responses:
 *       200:
 *         description: Address deleted successfully
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
 *         description: Address not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
addressRouter.delete("/disable",auth,deleteAddresscontroller)

export default addressRouter