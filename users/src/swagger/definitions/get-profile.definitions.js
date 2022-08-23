/**
 * @swagger
 * components:
 *   schemas:
 *     GetProfile:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: The user's id.
 *           example: 62fd77d55de94ce4a4d79d43
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API to manage you auth end point.
 */

/**
 * @swagger
 * /profile/{id}:
 *   get:
 *     summary: Get user information.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user's id.
 *         example: 62fd77d55de94ce4a4d79d43
 *         schema:
 *           ref: '#/components/schemas/GetProfile'
 *     responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *       401:
 *         description: Unauthorized | User not exists
 */
