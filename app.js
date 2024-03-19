const express = require('express');
const app = express();

const db = require("./app/models/index.js");
db.sequelize
.authenticate()
.then(() => console.log("Database connected ..."))
.catch((err) => console.log(err));

module.exports = app;