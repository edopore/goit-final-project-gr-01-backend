const { addDaySchema, day } = require("../../schema/daySchema");
const Joi = require("joi");

const addProductByDay = async (req, res) => {
  try {
    const { error, value } = addDaySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }
    const createProductDay = day(value);
    const productByDay = await createProductDay.save();
    return res.status(200).json(productByDay);
  } catch (error) {
    console.log(error);
    return res.json({ message: "An error has ocurred (addProductsByDay)" });
  }
};

module.exports = addProductByDay;
