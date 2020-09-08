const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");

const viewRouter = require("./routes/viewRoutes");

const app = express();

app.use(favicon(__dirname + "/public/imgs/favicon.ico"));

// TELLS EXPRESS WHICH TEMPLATE ENGINE TO USE
app.set("view engine", "pug");
// TELLS EXPRESS WHERE THE TEMPLATE VIEWS ARE LOCATED USING THE PATH MODULE
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", viewRouter);

module.exports = app;
