const { Schema, model } = require("mongoose");

const caloriasSchema = new Schema(
  {
    usuarioId: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    currentWeight: {
      type: Number,
      required: true,
    },
    desiredWeight: {
      type: Number,
      required: true,
    },
    bloodType: {
      type: Number,
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
  },
  {
    versionKey: false,
  }
);

module.exports = model("Calorias", caloriasSchema);
