const IngestaDiaria = require("../models/IngestaDiaria");

const obtenerIngestaDiaria = async (req, res) => {
  try {
    const { usuarioId } = req.user;
    const ingestaDiaria = await IngestaDiaria.findOne({ usuarioId }).sort({ fecha: -1 });
    if (!ingestaDiaria) {
      return res.status(404).json({ mensaje: "No se encontraron datos para hoy" });
    }
    res.status(200).json(ingestaDiaria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
};

const calcularIngestaCalorias = (peso, altura, edad, pesoDeseado) => {
  return 10 * peso + 6.25 * altura - 5 * edad - 161 - 10 * (peso - pesoDeseado);
};

const guardarIngestaDiaria = async (req, res) => {
  try {
    const { usuarioId } = req.user;
    const { peso, altura, edad, pesoDeseado, alimentosNoRecomendados } = req.body;

    const calorias = calcularIngestaCalorias(peso, altura, edad, pesoDeseado);

    const ingestaDiaria = new IngestaDiaria({
      usuarioId,
      calorias,
      alimentosNoRecomendados,
    });

    await ingestaDiaria.save();
    res.status(201).json({ mensaje: "Ingesta diaria guardada exitosamente", ingestaDiaria });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
};

module.exports = {
  obtenerIngestaDiaria,
  guardarIngestaDiaria,
};
