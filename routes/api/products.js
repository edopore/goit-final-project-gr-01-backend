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

const controllers = require("../../controllers/productController");
const { validateJWT } = require("../../utils/validateJWT");
const productsController = require("../../controllers/productController/products.blacklist"); //blacklist

//En point privados
router.get("", validateJWT, controllers.getProducts);

// endpoint lista de alimentos no recomendados y la ingesta diaria de calorías
router.post("/blacklist", productsController.getBlacklistAndCalories);

module.exports = router;
