const express = require("express");

const appRouter = express.Router();

const userRouter = require("./users");
const dailyrateRouter = require("./dailyrate");
const day = require("./day");
const products = require("./products");
const ingestaDiaria = require("./ingestaDiaria");
const calculatorRouter = require("./calculator");

appRouter.use("/users", userRouter);
appRouter.use("/daily-rate", dailyrateRouter);
appRouter.use("/ingesta-diaria", ingestaDiaria);
appRouter.use("/day", day);
appRouter.use("/products", products);
appRouter.use("/calculator", calculatorRouter);

module.exports = appRouter;
