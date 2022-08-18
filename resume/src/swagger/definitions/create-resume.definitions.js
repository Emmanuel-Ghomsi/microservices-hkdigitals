/**
 * @swagger
 * components:
 *   schemas:
 *     CreateResume:
 *       type: object
 *       required:
 *         - user
 *         - formations
 *         - experiences
 *         - skills
 *         - hobbies
 *         - languages
 *         - summary
 *       properties:
 *         user:
 *           type: string
 *           description: The user's id.
 *           example: 62fd77d55de94ce4a4d79d43
 *         formations:
 *           type: array
 *           description: The user's formations id.
 *           example: [62fd77d55de94ce4a4d79d43]
 *         experiences:
 *           type: array
 *           description: The user's experiences id.
 *           example: [62fd77d55de94ce4a4d79d43]
 *         skills:
 *           type: array
 *           description: The user's skills.
 *           example: ['devops', 'management']
 *         hobbies:
 *           type: array
 *           description: The user's hobbies.
 *           example: ['football', 'basketball']
 *         languages:
 *           type: map
 *           description: The user's languages.
 *           example: [french => 'senior', english => 'intermediate']
 *         summary:
 *           type: string
 *           description: The user's summary.
 *           example: I'am a full stack developper
 */

/**
 * @swagger
 * tags:
 *   name: Resume
 *   description: API to manage you resume end point.
 */

/**
 * @swagger
 * /profile:
 *   post:
 *     summary: Get user information.
 *     tags: [Resume]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateResume'
 *     responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resume:
 *                   type: object
 *       401:
 *         description: Unauthorized | An error occurred
 */
