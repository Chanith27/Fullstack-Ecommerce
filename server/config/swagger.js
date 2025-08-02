import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Lanka Basket API',
      version: '1.0.0',
      description: 'API documentation for Lanka Basket e-commerce platform',
      contact: {
        name: 'Lanka Basket Team',
        email: 'support@lankabasket.com',
      },
    },
    servers: [
      {
        url: process.env.VITE_API_URL || 'http://localhost:8080',
        description: 'Development server',
      },
      {
        url: 'https://your-production-url.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'User ID',
            },
            name: {
              type: 'string',
              description: 'User full name',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
            },
            avatar: {
              type: 'string',
              description: 'User avatar URL',
            },
            mobile: {
              type: 'string',
              description: 'User mobile number',
            },
            verify_email: {
              type: 'boolean',
              description: 'Email verification status',
            },
            last_login_date: {
              type: 'string',
              format: 'date-time',
              description: 'Last login date',
            },
            status: {
              type: 'string',
              enum: ['Active', 'Inactive', 'Suspended'],
              description: 'User account status',
            },
            address_details: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Address',
              },
            },
            shopping_cart: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/CartItem',
              },
            },
            orderHistory: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Order',
              },
            },
            role: {
              type: 'string',
              enum: ['ADMIN', 'USER'],
              description: 'User role',
            },
          },
        },
        Product: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Product ID',
            },
            name: {
              type: 'string',
              description: 'Product name',
            },
            image: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Product images URLs',
            },
            category: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Category',
              },
            },
            subCategory: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/SubCategory',
              },
            },
            unit: {
              type: 'string',
              description: 'Product unit (kg, pieces, etc.)',
            },
            stock: {
              type: 'number',
              description: 'Available stock quantity',
            },
            price: {
              type: 'number',
              description: 'Product price',
            },
            discount: {
              type: 'number',
              description: 'Discount percentage',
            },
            description: {
              type: 'string',
              description: 'Product description',
            },
            more_details: {
              type: 'object',
              description: 'Additional product details',
            },
            publish: {
              type: 'boolean',
              description: 'Product publish status',
            },
          },
        },
        Category: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Category ID',
            },
            name: {
              type: 'string',
              description: 'Category name',
            },
            image: {
              type: 'string',
              description: 'Category image URL',
            },
          },
        },
        SubCategory: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'SubCategory ID',
            },
            name: {
              type: 'string',
              description: 'SubCategory name',
            },
            image: {
              type: 'string',
              description: 'SubCategory image URL',
            },
            category: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Category',
              },
            },
          },
        },
        Address: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Address ID',
            },
            address_line: {
              type: 'string',
              description: 'Address line',
            },
            city: {
              type: 'string',
              description: 'City',
            },
            state: {
              type: 'string',
              description: 'State',
            },
            pincode: {
              type: 'string',
              description: 'Postal code',
            },
            country: {
              type: 'string',
              description: 'Country',
            },
            mobile: {
              type: 'string',
              description: 'Mobile number for delivery',
            },
          },
        },
        CartItem: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Cart item ID',
            },
            productId: {
              $ref: '#/components/schemas/Product',
            },
            quantity: {
              type: 'number',
              description: 'Item quantity',
            },
            userId: {
              type: 'string',
              description: 'User ID',
            },
          },
        },
        Order: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Order ID',
            },
            orderId: {
              type: 'string',
              description: 'Unique order identifier',
            },
            userId: {
              type: 'string',
              description: 'User ID',
            },
            orderStatus: {
              type: 'string',
              enum: ['pending', 'confirm', 'processing', 'shipped', 'delivered', 'cancelled'],
              description: 'Order status',
            },
            paymentId: {
              type: 'string',
              description: 'Payment ID',
            },
            payment_status: {
              type: 'string',
              enum: ['pending', 'completed', 'failed'],
              description: 'Payment status',
            },
            delivery_address: {
              $ref: '#/components/schemas/Address',
            },
            subTotalAmt: {
              type: 'number',
              description: 'Subtotal amount',
            },
            totalAmt: {
              type: 'number',
              description: 'Total amount',
            },
            invoice_receipt: {
              type: 'string',
              description: 'Invoice receipt URL',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
            },
            error: {
              type: 'boolean',
              default: true,
            },
          },
        },
        Success: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Success message',
            },
            error: {
              type: 'boolean',
              default: false,
            },
            data: {
              type: 'object',
              description: 'Response data',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
      {
        cookieAuth: [],
      },
    ],
  },
  apis: [
    './route/*.js',
    './controllers/*.js',
    './index.js',
  ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
