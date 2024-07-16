const { day } = require("../../schema/daySchema");

const deleteProductByDay = async (req, res) => {
  try {
    const getProductById = await day.findByIdAndDelete(req.params.foodId);
    if (getProductById === null) {
      return res.status(404).json({ message: "item not found" });
    }
    return res.status(204).json({ message: "Item deleted" });
  } catch (error) {
    console.log(error);
    return res.json({ message: "An error has ocurred (deleteProductsByDay)" });
  }
};

module.exports = deleteProductByDay;
