import { Router } from 'express'
import auth from '../middleware/auth.js'
import { CashOnDeliveryOrderController, getOrderDetailsController, paymentController, webhookStripe } from '../controllers/order.controller.js'

const orderRouter = Router()

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management and payment endpoints
 */

/**
 * @swagger
 * /api/order/cash-on-delivery:
 *   post:
 *     summary: Create cash on delivery order
 *     tags: [Orders]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - list_items
 *               - addressId
 *               - subTotalAmt
 *               - totalAmt
 *             properties:
 *               list_items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60f7b3b3b3b3b3b3b3b3b3b6"
 *                     productId:
 *                       type: string
 *                       example: "60f7b3b3b3b3b3b3b3b3b3b5"
 *                     quantity:
 *                       type: number
 *                       example: 2
 *               addressId:
 *                 type: string
 *                 example: "60f7b3b3b3b3b3b3b3b3b3b7"
 *               subTotalAmt:
 *                 type: number
 *                 example: 25.50
 *               totalAmt:
 *                 type: number
 *                 example: 30.00
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order created successfully"
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
orderRouter.post("/cash-on-delivery",auth,CashOnDeliveryOrderController)

/**
 * @swagger
 * /api/order/checkout:
 *   post:
 *     summary: Create Stripe payment session
 *     tags: [Orders]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - list_items
 *               - addressId
 *               - subTotalAmt
 *               - totalAmt
 *             properties:
 *               list_items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60f7b3b3b3b3b3b3b3b3b3b6"
 *                     productId:
 *                       type: string
 *                       example: "60f7b3b3b3b3b3b3b3b3b3b5"
 *                     quantity:
 *                       type: number
 *                       example: 2
 *               addressId:
 *                 type: string
 *                 example: "60f7b3b3b3b3b3b3b3b3b3b7"
 *               subTotalAmt:
 *                 type: number
 *                 example: 25.50
 *               totalAmt:
 *                 type: number
 *                 example: 30.00
 *     responses:
 *       200:
 *         description: Payment session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Payment session created"
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "cs_test_..."
 *                     url:
 *                       type: string
 *                       example: "https://checkout.stripe.com/pay/cs_test_..."
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
orderRouter.post('/checkout',auth,paymentController)

/**
 * @swagger
 * /api/order/webhook:
 *   post:
 *     summary: Stripe webhook endpoint
 *     tags: [Orders]
 *     description: Webhook endpoint for Stripe payment events (internal use)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Stripe webhook event data
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *       400:
 *         description: Invalid webhook signature
 */
orderRouter.post('/webhook',webhookStripe)

/**
 * @swagger
 * /api/order/order-list:
 *   get:
 *     summary: Get user's order history
 *     tags: [Orders]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Order list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orders retrieved successfully"
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
orderRouter.get("/order-list",auth,getOrderDetailsController)

export default orderRouter