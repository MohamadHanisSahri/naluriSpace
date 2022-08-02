const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config({ path: "./.env" });

const {
  DATABASE,
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,
  PORT,
  PG_USER,
  PG_HOST,
  PG_DATABASE,
  PG_PASSWORD,
  PG_PORT,
} = process.env;

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
  pgsql: {
    user: PG_USER,
    host: PG_HOST,
    database: PG_DATABASE,
    password: PG_PASSWORD,
    port: PG_PORT,
  },
};
