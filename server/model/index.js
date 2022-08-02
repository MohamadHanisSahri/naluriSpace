const config = require("../config");
const mysql = require("mysql2/promise");
const { Pool } = require("pg");

// ------------------------------------for postgresql

const selectAllPlanetsQuery_PG = async () => {
  const query = {
    text: "SELECT * FROM planets",
  };
  const pool = await new Pool(config.pgsql);

  const result = await pool.query(query);
  console.log(result.rows, "pg result");
  return result;
};

const insertPiCurrentValueQuery_PGSQL = async (data) => {
  const query = {
    text:
      "INSERT INTO pi_current_value(" +
      "pi_current_digit," +
      "pi_current_valueapproximation)" +
      "VALUES($1, $2)",
    values: [
      `${data.pi_current_digit}`,
      `${data.pi_current_valueapproximation}`,
    ],
  };
  const pool = await new Pool(config.pgsql);
  const result = await pool.query(query);
  console.log(result.rows, "pg result insert");
  return result;
};

const insertPlanetQuery_PGSQL = async (data) => {
  const query = {
    text:
      "INSERT INTO planets(" +
      "planet_name," +
      "planet_diameter," +
      "planet_circumference," +
      "pi_digit," +
      "pi_valueapproximation)" +
      "VALUES($1, $2, $3, $4, $5)",
    values: [
      `${data.planet_name}`,
      `${data.planet_diameter}`,
      `${data.planet_circumference}`,
      `${data.pi_digit}`,
      `${data.pi_valueapproxiamtion}`,
    ],
  };

  const pool = await new Pool(config.pgsql);
  await pool.query(query);
  return;
};

const findPlanetQuery_PGSQL = async (data) => {
  const query = {
    text: "SELECT planet_id FROM planets WHERE planet_name = $1",
    values: [`${data}`],
  };
  const pool = await new Pool(config.pgsql);
  const planetId = await pool.query(query);
  console.log(planetId, "planetId");
  return planetId.rows;
};

const getPiCurrentValueQuery_PGSQL = async (data) => {
  const query = {
    text:
      "SELECT " +
      "pi_id, " +
      "pi_current_digit, " +
      "pi_current_valueapproximation " +
      "FROM pi_current_value",
  };

  const pool = await new Pool(config.pgsql);
  const piCurrentValue = await pool.query(query);
  console.log(piCurrentValue, "pi curent value query");
  return piCurrentValue.rows[0];
};

const updatePiCurrentValueQuery_PGSQL = async (data) => {
  const query = {
    text:
      "UPDATE pi_current_value SET " +
      "pi_current_digit = $2, " +
      "pi_current_valueapproximation = $3 " +
      "WHERE pi_id = $1",
    values: [
      `${data.pi_id}`,
      `${data.pi_current_digit}`,
      `${data.pi_current_valueapproximation}`,
    ],
  };

  const pool = await new Pool(config.pgsql);
  await pool.query(query);
  return;
};

const updatePlanetQuery_PGSQL = async (data) => {
  console.log(data, "update data in query");
  const query = {
    text:
      "UPDATE planets SET " +
      "planet_name = $1, " +
      "planet_diameter = $2, " +
      "planet_circumference = $3, " +
      "pi_digit = $4, " +
      "pi_valueapproximation = $5 " +
      "WHERE planet_id = $6",
    values: [
      `${data.planet_name}`,
      `${data.planet_diameter}`,
      `${data.planet_circumference}`,
      `${data.pi_digit}`,
      `${data.pi_valueapproximation}`,
      `${data.planet_id}`,
    ],
  };

  const pool = await new Pool(config.pgsql);
  await pool.query(query);
  return;
};

const deletePlanetQuery_PGSQL = async (data) => {
  const query = {
    text: "DELETE FROM planets WHERE planet_id = $1",
    values: [`${data}`],
  };

  const pool = await new Pool(config.pgsql);
  await pool.query(query);
  return;
};

// ------------------------------------for mysql

const selectAllResultQuery = async () => {
  const pool = await mysql.createPool(config.mysql);
  const [[row]] = await pool.query(`call SP_GetAllPlanet()`);
  console.log(row, "getAllData");
  return row;
};

const insertPlanetSurfaceQuery = async (data) => {
  const { name, diameter, digit, piValueApproximation, planetCircumference } =
    data;
  const pool = await mysql.createPool(config.mysql);
  await pool.query(`call SP_InsertPlanet(?,?,?,?,?)`, [
    name,
    diameter,
    planetCircumference,
    digit,
    piValueApproximation,
  ]);
  return;
};

const getCurrentDigitQuery = async (data) => {
  const pool = await mysql.createPool(config.mysql);
  console.log(data, "data Pi_Digit");
  const [[[Pi_Digit]]] = await pool.query(`call SP_GetCurrentDigit(?)`, [data]);
  return Pi_Digit;
};

const updatePlanetQuery = async (data) => {
  const {
    id,
    name,
    diameter,
    digit,
    piValueApproximation,
    planetCircumference,
  } = data;
  const pool = await mysql.createPool(config.mysql);
  await pool.query(`call SP_UpdatePlanet(?,?,?,?,?,?)`, [
    id,
    name,
    diameter,
    planetCircumference,
    digit,
    piValueApproximation,
  ]);
  return;
};

const deletePlanetQuery = async (id) => {
  const pool = await mysql.createPool(config.mysql);
  await pool.query(`call SP_DeletePlanet(?)`, [id]);
  return;
};

module.exports = {
  selectAllResultQuery,
  insertPlanetSurfaceQuery,
  getCurrentDigitQuery,
  updatePlanetQuery,
  deletePlanetQuery,
  selectAllPlanetsQuery_PG,
  insertPiCurrentValueQuery_PGSQL,
  insertPlanetQuery_PGSQL,
  findPlanetQuery_PGSQL,
  getPiCurrentValueQuery_PGSQL,
  updatePiCurrentValueQuery_PGSQL,
  updatePlanetQuery_PGSQL,
  deletePlanetQuery_PGSQL,
};
