/**
 * @swagger
 * tags:
 *  name: Products
 *  description: API para administracion de productos permitidos y no permitidos
 * /products/:
 *  get:
 *      tags: [Products]
 *      summary: Obtiene listado de alimentos según búsqueda
 *      responses:
 *          200:
 *              description: Listado de alimentos exitoso
 *              content:
 *                  application/json:
 *                      schema:
 *                          productIds:
 *                              type: object
 *                              description: Listado de alimentos encontrados al realizar calculo
 *                          example:
 *                              productIds: ["5d51694802b2373622ff5543", "5d51694802b2373622ff555c"]
 *          401:
 *              description: Acceso no autorizado al recurso
 *              content:
 *                  application/json:
 *                      schema:
 *                          message:
 *                              type: string
 *                              description: mensaje de respuesta al hacer accción con usuario no autorizado.
 *                          example:
 *                              message: Usuario no autorizado

 *          500:
 *              description: Algún error interno en servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/error/internal'
 * /products/blacklist:
 *  post:
 *      tags: [Products]
 *      summary: Obtiene listado de alimentos no recomendables para consumo de acuerdo a calculo de calorías
 *      responses:
 *          200:
 *              description: Listado de alimentos exitoso
 *              content:
 *                  application/json:
 *                      schema:
 *                          productIds:
 *                              type: object
 *                              description: Listado de alimentos encontrados al realizar calculo
 *                          example:
 *                              productIds: ["5d51694802b2373622ff5543", "5d51694802b2373622ff555c"] 
 *          500:
 *              description: Algún error interno en servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/error/internal' 
 */
const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/productController");
const { validateJWT } = require("../../utils/validateJWT");
const productsController = require("../../controllers/productController/products.blacklist"); //blacklist

//En point privados
router.get("/", validateJWT, controllers.getProducts);

// endpoint lista de alimentos no recomendados y la ingesta diaria de calorías
router.post("/blacklist", productsController.getBlacklistAndCalories);

module.exports = router;
