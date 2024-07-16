/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: email's user
 *         password:
 *           type: string
 *           description: password's user
 *       example:
 *         email: pruebamail@goitmail.com
 *         password: passwordg01t
 */
const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/dailyRateControllers");
const { validateJWT } = require("../../utils/validateJWT");

//End point publicos
router.post("/", controllers.dailyRate);

//En point privados
router.post("/:userId", validateJWT, controllers.dailyRateById);

module.exports = router;
