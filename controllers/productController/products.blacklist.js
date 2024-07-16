const products = require("../../db/es-productos.json");

exports.getBlacklistAndCalories = (req, res) => {
  const selectedProductIds = req.body.productIds;

  // Filtra productos no recomendados basados en el campo `groupBloodNotAllowed`
  const blacklist = products.filter((product) =>
    product.groupBloodNotAllowed.includes(true)
  );

  // Si no se proporcionan IDs de productos, solo devuelve la lista negra
  if (
    !selectedProductIds ||
    !Array.isArray(selectedProductIds) ||
    selectedProductIds.length === 0
  ) {
    return res.json({ blacklist });
  }

  // Filtra productos seleccionados
  const selectedProducts = products.filter((product) =>
    selectedProductIds.includes(product._id.$oid)
  );
  const dailyCalorieIntake = selectedProducts.reduce(
    (total, product) => total + product.calories,
    0
  );

  res.json({
    dailyCalorieIntake,
    blacklist,
  });
};
