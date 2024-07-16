const Calorias = require("../../models/calorias");
const { calculateDailyCalories } = require("../../utils/calculateCalories");

const calculateCaloriesById = async (req, res) => {
  try {
    const { userId } = req.params;
    const { height, age, currentWeight, desiredWeight, bloodType } = req.body;

    // Verificaciones detalladas
    if (!height) {
      return res.status(400).json({ message: "Altura es requerida" });
    }
    if (!age) {
      return res.status(400).json({ message: "Edad es requerida" });
    }
    if (!currentWeight) {
      return res.status(400).json({ message: "Peso actual es requerido" });
    }
    if (!desiredWeight) {
      return res.status(400).json({ message: "Peso deseado es requerido" });
    }
    if (!bloodType) {
      return res.status(400).json({ message: "Tipo de sangre es requerido" });
    }

    // Usar la función de utilidades para calcular las calorías diarias
    const calorias = calculateDailyCalories(
      currentWeight,
      height,
      age,
      desiredWeight
    );

    if (isNaN(calorias)) {
      return res.status(400).json({
        message:
          "Error al calcular las calorías, por favor verifica los datos ingresados",
      });
    }

    const alimentosNoRecomendados = getAlimentosNoRecomendados(bloodType);

    const nuevaCaloria = new Calorias({
      usuarioId: userId,
      height,
      age,
      currentWeight,
      desiredWeight,
      bloodType,
      calorias,
      alimentosNoRecomendados,
    });

    await nuevaCaloria.save();

    res.status(201).json({
      message: "Consumo calórico calculado exitosamente",
      calorias,
      alimentosNoRecomendados,
    });
  } catch (error) {
    console.error("Error al calcular el consumo calórico:", error);
    res.status(500).json({
      message: "Error al calcular el consumo calórico",
      error: error.message,
    });
  }
};

const calculateCaloriesNoId = async (req, res) => {
  try {
    const { height, age, currentWeight, desiredWeight, bloodType } = req.body;
    // Verificaciones detalladas
    if (!height) {
      return res.status(400).json({ message: "Altura es requerida" });
    }
    if (!age) {
      return res.status(400).json({ message: "Edad es requerida" });
    }
    if (!currentWeight) {
      return res.status(400).json({ message: "Peso actual es requerido" });
    }
    if (!desiredWeight) {
      return res.status(400).json({ message: "Peso deseado es requerido" });
    }
    if (!bloodType) {
      return res.status(400).json({ message: "Tipo de sangre es requerido" });
    }

    // Usar la función de utilidades para calcular las calorías diarias
    const calorias = calculateDailyCalories(
      currentWeight,
      height,
      age,
      desiredWeight
    );

    if (isNaN(calorias)) {
      return res.status(400).json({
        message:
          "Error al calcular las calorías, por favor verifica los datos ingresados",
      });
    }

    const alimentosNoRecomendados = getAlimentosNoRecomendados(bloodType);

    res.status(201).json({
      message: "Consumo calórico calculado exitosamente",
      calorias,
      alimentosNoRecomendados,
    });
  } catch (error) {
    console.error("Error al calcular el consumo calórico:", error);
    res.status(500).json({
      message: "Error al calcular el consumo calórico",
      error: error.message,
    });
  }
};

const getAlimentosNoRecomendados = (bloodType) => {
  const alimentos = {
    1: ["Alimento1", "Alimento2"],
    2: ["Alimento3", "Alimento4"],
    3: ["Alimento5", "Alimento6"],
    4: ["Alimento7", "Alimento8"],
  };
  return alimentos[bloodType] || [];
};

module.exports = { calculateCaloriesById, calculateCaloriesNoId };
