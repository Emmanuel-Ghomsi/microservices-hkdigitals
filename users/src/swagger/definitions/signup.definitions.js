/**
 * @swagger
 * components:
 *   schemas:
 *     SignUp:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: Emmanuel Doe
 *         email:
 *           type: string
 *           description: The user's unique email.
 *           example: emmanueldoe@example.com
 *         password:
 *           type: string
 *           description: The user's password.
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API to manage you auth end point.
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user (OpenAPI - JWT).
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUp'
 *     responses:
 *       201:
 *         description: The request was successful and a new user was created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 62fd77d55de94ce4a4d79d43
 *                 token:
 *                   type: string
 *                   description: JWT
 *       401:
 *         description: Unauthorized | User already exists
 */
