require('dotenv').config(); // Charge les variables d'environnement depuis .env

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: 'mysql'
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_DATABASE}_test`,
    host: DB_HOST,
    dialect: 'mysql'
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_DATABASE}_prod`,
    host: DB_HOST,
    dialect: 'mysql'
  }
};
