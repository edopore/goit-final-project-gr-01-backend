const IngestaDiaria = require("../../models/IngestaDiaria");

const dailyRate = async (req, res) => {
  try {
    const { usuarioId } = req.user;
    const ingestaDiaria = await IngestaDiaria.findOne({ usuarioId }).sort({
      fecha: -1,
    });
    if (!ingestaDiaria) {
      return res
        .status(404)
        .json({ mensaje: "No se encontraron datos para hoy" });
    }
    res.status(200).json(ingestaDiaria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
};

module.exports = dailyRate;
