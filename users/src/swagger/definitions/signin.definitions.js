/**
 * @swagger
 * components:
 *   schemas:
 *     SignIn:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
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
 * /signin:
 *   post:
 *     summary: Log a new user (OpenAPI - JWT).
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignIn'
 *     responses:
 *       200:
 *         description: The request was successful and a user was logged in.
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
 *         description: Unauthorized | User not exists | Password invalid
 */
