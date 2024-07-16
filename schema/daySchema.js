const { Schema, model } = require("mongoose");
const Joi = require("joi");

const daySchema = Schema({
  date: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },
  weight: {
    type: Number,
  },
});

const day = model("days", daySchema);

// Validaciones con JOI
const addDaySchema = Joi.object({
  date: Joi.string().required(),
  user: Joi.string().required(),
  product: Joi.string().required(),
  weight: Joi.number().required(),
});

module.exports = {
  day,
  addDaySchema,
};
