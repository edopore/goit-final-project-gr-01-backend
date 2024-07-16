/**
 * @swagger
 * tags:
 *   name: Day
 *   description: API para administración de alimentos
 * /day/:
 *    post:
 *      summary: crea nuevo producto consumido en el día
 *      tags: [Day]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Day'
 *      responses:
 *          200:
 *              description: Alimento ingresado con exito
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Day'
 *          401:
 *              description: Usuario no autorizado
 *              content:
 *                  application/json:
 *                      schema:
 *                          message:
 *                              type: string
 *                              description: mensaje de respuesta al cierre de sesión fallido
 *                          example:
 *                              message: Usuario no autorizado
 *          500:
 *              description: Algún error interno del servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/error/internal'
 * /day/info:
 *  get:
 *      summary: Obtiene la información de alimentos según el día que se ingresaron.
 *      tags: [Day]
 *      requestHeader:
 *          required: true
 *      content:
 *          Authorization:
 *              AuthBearer: []
 *      responses:
 *          200:
 *            description: Se encuentra información relacionada.
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Day'
 *          401:
 *              description: Usuario no autorizado
 *              content:
 *                  application/json:
 *                      schema:
 *                          message:
 *                              type: string
 *                              description: mensaje de respuesta al cierre de sesión fallido
 *                          example:
 *                              message: Usuario no autorizado
 *          500:
 *              description: Algún error interno del servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/error/internal'
 * /day/{foodId}:
 *  delete:
 *      summary: Elimina un alimento dependiendo de su Id.
 *      tags: [Day]
 *      parameters:
 *        - in: path
 *          name: foodId
 *          type: string
 *          required: true
 *          description: Id del elemento a eliminar en el día
 *      responses:
 *        204:
 *          description: Eliminado con exto
 *          content:
 *              application/json:
 *                  schema:
 *                      message:
 *                          type: string
 *                          description: mensaje de respuesta al eliminar exitosamente
 *                      example:
 *                          message: Elemento eliminado
 *        401:
 *          description: Usuario no autorizado
 *          content:
 *              application/json:
 *                  schema:
 *                      message:
 *                          type: string
 *                          description: mensaje de respuesta al cierre de sesión fallido
 *                      example:
 *                          message: Usuario no autorizado
 *        404:
 *          description: Elemento no se encuentra
 *          content:
 *              application/json:
 *                  schema:
 *                      message:
 *                          type: string
 *                          description: mensaje de respuesta al no encontrar el elemento
 *                      example:
 *                          message: Alimento no encontrado
 *        500:
 *          description: Algún error interno del servidor
 *          content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/error/internal'
 *
 * components:
 *   schemas:
 *     Day:
 *       type: object
 *       required:
 *         - date
 *         - user
 *         - product
 *         - weight
 *       properties:
 *         date:
 *           type: string
 *           description: Día en que se ingresa el alimento
 *         user:
 *           type: string
 *           description: Usuario que hace el ingreso del alimento
 *         product:
 *           type: string
 *           description: Alimento que se ingresa para el conteo
 *         weight:
 *           type: number
 *           description: Cantidad de alimento ingresado (peso en gramos)
 *       example:
 *         date: "2024-07-07"
 *         user: 6684303af94a93046cd262b8
 *         product: 5d51694802b2373622ff5543
 *         weight: 100
 */
const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/dayController");
const { validateJWT } = require("../../utils/validateJWT");

//End point privados
router.post("/", validateJWT, controllers.addProductByDay);

router.delete("/:foodId", validateJWT, controllers.deleteProductByDay);

router.get("/info", validateJWT, controllers.getProductsByDay);

module.exports = router;
