const app = require("./app");
const conectionDB = require("./db/config");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

conectionDB();

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running. Use our API on port: ${process.env.PORT || 3000}`);
});
