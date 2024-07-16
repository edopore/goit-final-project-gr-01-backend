const mongoose = require("mongoose");

const conectionDB = async () => {
  try {
    console.log("connecting to db...");
    console.log(`DB_HOST: ${process.env.DB_HOST}`); // Agregar esto para depurar
    await mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to DB");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = conectionDB;
