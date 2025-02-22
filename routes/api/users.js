/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API de administración de usuarios
 * /users/signup:
 *   post:
 *     summary: Registrarse en la aplicacion
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario registrado con exito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       409:
 *         description: Usuario con correo electrónico ya existe.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/error/exist'
 *       500:
 *         description: Algún error interno en el servidor
 *         content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/error/internal'
 * /users/login:
 *   post:
 *     summary: Iniciar sesión en la aplicación
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Usuario inicia sesión con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginToken'
 *       401:
 *         description: Campos requeridos faltan para iniciar sesión.
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/error/missingFields'
 *       500:
 *         description: Algún error interno en el servicio
 *         content:
 *             application/json:
 *                  schema:
 *                      $ref: '#/components/error/internal'
 * /users/logout:
 *   post:
 *      security:
 *          bearerAuth: []
 *      summary: Cierre de sesión del usuario
 *      tags: [Users]
 *      responses:
 *       204:
 *         description: Usuario cierra sesión exitosamente.
 *         content:
 *       401:
 *          description: Usuario no autorizado
 *          content:
 *              application/json:
 *                  schema:
 *                      message:
 *                          type: string
 *                          description: mensaje de respuesta al cierre de sesión fallido
 *                      example:
 *                          message: Usuario no autorizado
 *       500:
 *         description: Algún error interno en el servicio
 *         content:
 *             application/json:
 *                  schema:
 *                      $ref: '#/components/error/internal'
 * components:
 *   error:
 *      internal:
 *          properties:
 *              message:
 *                  type: string
 *                  description: Ha ocurrido un error interno
 *          example:
 *              message: Ocurrió un error en el servicio
 *      exist:
 *          properties:
 *              message:
 *                  type: string
 *                  description: El correo usado para registrarse ya existe
 *          example:
 *              message: Correo electrónico se encuentra en uso
 *      missingFields:
 *          properties:
 *              message:
 *                  type: string
 *                  description: Datos erroneos al iniciar sesión
 *          example:
 *              message: Correo o contraseña erroneos
 *   schemas:
 *     Login:
 *      type: object
 *      properties:
 *          name:
 *            type: string
 *            description: nombre del usuario registrado
 *          email:
 *             type: string
 *             description: correo electrónico registrado
 *      example:
 *          user:
 *              name: emma stone
 *              email: emmas@goitmail.com
 *     LoginToken:
 *      type: object
 *      properties:
 *          email:
 *              type: string
 *              description: correo electrónico registrado
 *          token:
 *              type: string
 *              description: token generado para el acceso al servicio
 *      example:
 *          token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njg0MzAzYWY5NGE5MzA0NmNkMjYyYjgiLCJlbWFpbCI6InBydWViYW1haWxAZ29pdG1haWwuY29tIiwiaWF0IjoxNzIwMzIwNzM1LCJleHAiOjE3MjAzMjQzMzV9.EBSno_JbEWhxXHpAkXAJQIwfj3aeTyNhxpinnmuFtGw
 *          user:
 *              email: emmas@goitmail.com
 *              name: emma stone
 *     UserLogin:
 *      type: object
 *      required:
 *          - email
 *          - password
 *      properties:
 *          email:
 *              type: string
 *              description: Correo electrónico del usuario
 *          password:
 *              type: string
 *              description: Contraseña para la cuenta del usuario
 *      example:
 *          email: emmas@goitmail.com
 *          password: passwordg01t
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           description: Contraseña para la cuenta del usuario
 *       example:
 *         name: emma stone
 *         email: emmas@goitmail.com
 *         password: passwordg01t
 */
const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/userControllers/index");
const { validateJWT } = require("../../utils/validateJWT");

//End point publicos
router.post("/signup", controllers.registerUser);

router.post("/login", controllers.login);

//End point privados
router.post("/logout", validateJWT, controllers.logout);

router.get("/current", validateJWT, controllers.current);

module.exports = router;
