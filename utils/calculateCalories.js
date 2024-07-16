const calculateDailyCalories = (peso, altura, edad, pesoDeseado) => {
  return 10 * peso + 6.25 * altura - 5 * edad - 161 - 10 * (peso - pesoDeseado);
};

module.exports = { calculateDailyCalories };
