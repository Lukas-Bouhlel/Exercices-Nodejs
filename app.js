const express = require('express');
const cors = require('cors');
const app = express();
const router = require("./app/routes/index.js");
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml')
const fs = require('fs');

const file  = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const db = require("./app/models/index.js");
db.sequelize
.authenticate()
.then(() => console.log("Database connected ..."))
.catch((err) => console.log(err));

app.use(express.json());
app.use(cors(process.env.ORIGIN));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const { apiLimiter } = require('./app/middleware/limiter.js');
app.use("/api", apiLimiter, router);

module.exports = app;