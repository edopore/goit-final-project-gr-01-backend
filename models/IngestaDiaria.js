const { Schema, model, Types } = require("mongoose");

const ingestaDiariaEsquema = new Schema({
  usuarioId: {
    type: Types.ObjectId,
    ref: "usuarios",
    required: true,
  },
  calorias: {
    type: Number,
    required: true,
  },
  alimentosNoRecomendados: {
    type: [String],
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
}, {
  versionKey: false,
});

const IngestaDiaria = model("ingestaDiaria", ingestaDiariaEsquema);

module.exports = IngestaDiaria;
