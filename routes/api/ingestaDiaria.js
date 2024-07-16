/**
 * @swagger
 * tags:
 *  name: ingesta-diaria
 *  description: API para administración de la ingesta diaria
 * /ingesta-diaria:
 *  get:
 *      summary: Obtiene la ingesta diaría de alimentos.
 *      tags: [ingesta-diaria]
 *      responses:
 *       200:
 *          description: Alimento ingresado con exito
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Ingesta'
 *
 *       401:
 *          description: Usuario no autorizado
 *          content:
 *              application/json:
 *                  schema:
 *                      message:
 *                          type: string
 *                          description: mensaje de respuesta al hacer accción con usuario no autorizado.
 *                      example:
 *                          message: Usuario no autorizado
 *       500:
 *              description: Algún error interno del servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/error/internal'
 *  post:
 *    summary: ingresa la ingesta de un alimento
 *    tags: [ingesta-diaria]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Ingesta'
 *    responses:
 *       200:
 *          description: Alimento ingresado con exito
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Ingesta'
 *
 *       401:
 *          description: Usuario no autorizado
 *          content:
 *              application/json:
 *                  schema:
 *                      message:
 *                          type: string
 *                          description: mensaje de respuesta al hacer accción con usuario no autorizado.
 *                      example:
 *                          message: Usuario no autorizado
 *       500:
 *              description: Algún error interno del servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/error/internal'
 * components:
 *   schemas:
 *     Ingesta:
 *       type: object
 *       required:
 *         - usuarioId
 *         - calorias
 *         - alimentosNoRecomendados
 *         - fecha
 *       properties:
 *         usuarioId:
 *           type: string
 *           description: Id del usuario
 *         calorias:
 *           type: string
 *           description: Cantidad de calorias consumidas
 *         alimentosNoRecomendados:
 *           type: string
 *           description: Lista de alimentos no recomendados basados en la cantidad de calorías
 *         fecha:
 *           type: string
 *           descripcion: Fecha en la que se registra el consumo de calorías
 *       example:
 *         usuarioId: 6684303af94a93046cd262b8
 *         calorias: 1000
 *         alimentos no recomendados: ["Cereales","Frutos secos","Lacteos","Avena"]
 *         fecha: "2024-06-06"
 */

const express = require("express");
const router = express.Router();
const {
  obtenerIngestaDiaria,
  guardarIngestaDiaria,
} = require("../../controladores/ingestaDiariaControlador");
const { validateJWT } = require("../../utils/validateJWT");

router.get("/", validateJWT, obtenerIngestaDiaria);
router.post("/", validateJWT, guardarIngestaDiaria);

module.exports = router;
