const express = require("express");
const path = require("path");

const viewRouter = require("./routes/viewRoutes");

const app = express();

// TELLS EXPRESS WHICH TEMPLATE ENGINE TO USE
app.set("view engine", "pug");
// TELLS EXPRESS WHERE THE TEMPLATE VIEWS ARE LOCATED USING THE PATH MODULE
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
console.log(path.join(__dirname, "public"));

app.use("/", viewRouter);

module.exports = app;
