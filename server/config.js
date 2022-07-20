const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config({ path: "./.env" });

const { DATABASE, DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, PORT } =
  process.env;

module.exports = {
  port: PORT,
  mysql: {
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
};
