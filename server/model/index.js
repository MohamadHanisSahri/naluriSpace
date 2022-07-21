const config = require("../config");
const mysql = require("mysql2/promise");

const selectAllResultQuery = async () => {
  const pool = await mysql.createPool(config.mysql);
  const [[row]] = await pool.query(`call SP_GetAllPlanet()`);
  console.log(row, "getAllData");
  return row;
};

const insertPlanetSurfaceQuery = async (data) => {
  const {
    name,
    radius,
    diameter,
    digit,
    piValueApproximation,
    planetCircumference,
  } = data;
  const pool = await mysql.createPool(config.mysql);
  await pool.query(`call SP_InsertPlanet(?,?,?,?,?,?)`, [
    name,
    radius,
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
  console.log(Pi_Digit, "Pi_Digit");
  return Pi_Digit;
};

const updatePlanetController = async (data) => {
  const {
    name,
    radius,
    diameter,
    digit,
    piValueApproximation,
    planetCircumference,
  } = data;
  const pool = await mysql.createPool(config.mysql);
  await pool.query(`call SP_UpdatePlanet(?,?,?,?,?,?)`, [
    name,
    radius,
    diameter,
    planetCircumference,
    digit,
    piValueApproximation,
  ]);
  return;
};

module.exports = {
  selectAllResultQuery,
  insertPlanetSurfaceQuery,
  getCurrentDigitQuery,
  updatePlanetController,
};
