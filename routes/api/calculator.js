const express = require("express");
const {
  calculateCaloriesById,
  calculateCaloriesNoId,
} = require("../../controllers/calculator");
const { validateJWT } = require("../../utils/validateJWT"); // Asegúrate de usar la desestructuración correcta
const router = express.Router();

router.post("/calculator/:userId", validateJWT, calculateCaloriesById);
router.post("/calculator", calculateCaloriesNoId);

module.exports = router;
