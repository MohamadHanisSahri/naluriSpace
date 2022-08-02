const dataModel = require("../model");
const { computePI } = require("../computation/pi_digitComputation");
const logger = require("../logger");

// --------------------------------------------for pgsql

const selectAllPlanetsController_PG = async (req, res, next) => {
  try {
    const getPlanets = await dataModel.selectAllPlanetsQuery_PG();
    res.status(200).send(getPlanets.rows);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ errorMessage: "Failed to get planet list!" });
  }
};

const insertPiCurrentValueController_PGSQL = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data, "pg insert current pi value");
    await dataModel.insertPiCurrentValueQuery_PGSQL(data);
    res
      .status(200)
      .send({ successMessage: "Pi current value saved successfully!" });
  } catch (error) {
    logger.error(error);
    res.status(400).send({ errorMessage: "Failed to save Pi current value!" });
  }
};

const insertPlanetController_PGSQL = async (req, res, next) => {
  const data = req.body;
  const { planet_name, planet_diameter } = data;
  let planetExist = false;
  let piCurrentId;
  let currentPiDigit;
  let valueApproximation;
  let circumference;

  try {
    planetExist = await findPlanetController_PGSQL(planet_name);
    if (planetExist && planetExist.length > 0) {
      res.status(200).send({ successMessage: "Planet already exist!" });
      return;
    }
  } catch (error) {
    logger.error(error);
    res.status(400).send({ errorMessage: "Failed to find existinf planet!" });
  }

  if (!planetExist || (planetExist && planetExist.length < 1)) {
    try {
      const piCurrentData = await getPiCurrentValueController_PGSQL();
      piCurrentId = piCurrentData.pi_id;
      currentPiDigit = piCurrentData.pi_current_digit + 1;
      console.log(piCurrentData, "pi insert get pi current value");
    } catch (error) {
      logger.error(error);
      res.status(400).send({ errorMessage: "Failed to get current pi value!" });
    }

    const calculatePi = await calculateCircumference({
      diameter: planet_diameter,
      digit: currentPiDigit,
    });
    const { planetCircumference, piValueApproximation } = calculatePi;
    valueApproximation = piValueApproximation;
    circumference = planetCircumference;

    try {
      await dataModel.insertPlanetQuery_PGSQL({
        planet_name,
        planet_diameter,
        planet_circumference: circumference,
        pi_digit: currentPiDigit,
        pi_valueapproxiamtion: valueApproximation,
      });
      await updatePiCurrentValueController_PGSQL({
        pi_id: piCurrentId,
        pi_current_digit: currentPiDigit,
        pi_current_valueapproximation: valueApproximation,
      });
      res
        .status(200)
        .send({ successMessage: "Successfully saved new planet data!" });
    } catch (error) {
      logger.error(error);
      res.status(400).send({ errorMessage: "Failed to save planet data!" });
    }
  }
};

const findPlanetController_PGSQL = async (data) => {
  const planetId = await dataModel.findPlanetQuery_PGSQL(data);
  console.log(planetId.length, "return planetId controller");
  return planetId;
};

const getPiCurrentValueController_PGSQL = async (data) => {
  const piCurrentData = await dataModel.getPiCurrentValueQuery_PGSQL();
  return piCurrentData;
};

const updatePiCurrentValueController_PGSQL = async (data) => {
  await dataModel.updatePiCurrentValueQuery_PGSQL(data);
  return;
};

const updatePlanetController_PGSQL = async (req, res, next) => {
  const data = req.body;
  const { planet_name, planet_diameter, planet_id } = data;
  let piCurrentId;
  let currentPiDigit;
  let valueApproximation;
  let circumference;
  try {
    const piCurrentData = await getPiCurrentValueController_PGSQL();
    piCurrentId = piCurrentData.pi_id;
    currentPiDigit = piCurrentData.pi_current_digit + 1;
    console.log(currentPiDigit, "currentPiDigit");
  } catch (error) {
    logger.error(error);
    res.status(400).send({ errorMessage: "Failed to get current pi value!" });
  }
  try {
    const calculatePi = await calculateCircumference({
      diameter: planet_diameter,
      digit: currentPiDigit,
    });
    const { planetCircumference, piValueApproximation } = calculatePi;
    valueApproximation = piValueApproximation;
    circumference = planetCircumference;
  } catch (error) {
    logger.error(error);
    res.status(400).send({ errorMessage: "Failed to calculate pi value!" });
  }

  try {
    await dataModel.updatePlanetQuery_PGSQL({
      planet_id,
      planet_name,
      planet_diameter,
      planet_circumference: circumference,
      pi_digit: currentPiDigit,
      pi_valueapproximation: valueApproximation,
    });
    await updatePiCurrentValueController_PGSQL({
      pi_id: piCurrentId,
      pi_current_digit: currentPiDigit,
      pi_current_valueapproximation: valueApproximation,
    });
    res
      .status(200)
      .send({ successMessage: "Successfully saved new planet data!" });
  } catch (error) {
    logger.error(error);
    res.status(400).send({ errorMessage: "Failed to update planet data!" });
  }
};

const deletePlanetController_PGSQL = async (req, res, next) => {
  try {
    const data = req.params.planetId;
    await dataModel.deletePlanetQuery_PGSQL(data);
    res.status(200).send({ successMessage: "Planet data has been deleted!" });
  } catch (error) {
    logger.error(error);
    res.satus(400).send({ errorMessage: "Failed to delete planet data!" });
  }
};

// --------------------------------------------for mysql

const selectAllResultController = async (req, res, next) => {
  try {
    const getData = await dataModel.selectAllResultQuery();
    res.status(200).send(getData);
  } catch (error) {
    logger.error(error);
    res.status(400).send({ errorMessage: "Failed to get planet list!" });
  }
};

const insertPlanetController = async (req, res, next) => {
  const planetData = req.body;
  console.log(req.body, "body");
  let planetExist = false;

  try {
    planetExist = await dataModel.getCurrentDigitQuery(planetData.name);
    console.log(planetExist, "planetExist");
  } catch (error) {
    logger.error(error);
    console.log(error.message);
  }

  if (!planetExist) {
    try {
      const calculateResult = await calculateCircumference({
        diameter: planetData.diameter,
        digit: planetData.digit,
      });
      const { planetCircumference, piValueApproximation } = calculateResult;
      console.log(calculateResult, "calculateResult");
      await dataModel.insertPlanetSurfaceQuery({
        name: planetData.name,
        diameter: planetData.diameter,
        planetCircumference,
        digit: planetData.digit,
        piValueApproximation,
      });
      res.status(200).send("successfully saved new data");
    } catch (error) {
      logger.error(error);
      console.log(error.message);
    }
    return;
  }

  try {
    const calculationByIncrementDigitResult = await calculateCircumference({
      diameter: planetData.diameter,
      digit: planetData.digit,
    });
    console.log(
      calculationByIncrementDigitResult,
      "calculationByIncrementDigitResult"
    );
    const { planetCircumference, piValueApproximation } =
      calculationByIncrementDigitResult;
    await dataModel.updatePlanetQuery({
      id: planetData.id,
      name: planetData.name,
      diameter: planetData.diameter,
      planetCircumference,
      digit: planetData.digit,
      piValueApproximation,
    });
    res.status(200).send("successfully updated");
  } catch (error) {
    logger.error(error);
    console.log(error.message);
    res.status(400).send(error.message);
  }
  return;
};

const insertPlanetIncrementController = async (req, res, next) => {
  const planetData = req.body;
  console.log(planetData, "insert controller");
  let planetExist = false;
  let planetExistId;
  let planetExistDigit;

  try {
    planetExist = await dataModel.getCurrentDigitQuery(planetData.planet_name);
    console.log(planetExist, "planetExist");
    if (planetExist) {
      planetExistDigit = planetExist.Pi_Digit;
      planetExistId = planetExist.Planet_ID;
    }
  } catch (error) {
    logger.error(error);
    console.log(error.message);
    res.status(400).send({ errorMessage: "Something went wrong!" });
  }

  if (!planetExist) {
    try {
      const calculateResult = await calculateCircumference({
        diameter: planetData.planet_diameter,
        digit: 1,
      });
      const { planetCircumference, piValueApproximation } = calculateResult;
      await dataModel.insertPlanetSurfaceQuery({
        name: planetData.planet_name,
        diameter: planetData.planet_diameter,
        planetCircumference,
        digit: 1,
        piValueApproximation,
      });
      res
        .status(200)
        .send({ successMessage: "Successfully saved new planet!" });
    } catch (error) {
      logger.error(error);
      console.log(error.message);
      res.status(400).send({ errorMessage: "Failed to save the data!" });
    }
    return;
  }

  try {
    const incrDigit = +planetExistDigit + 1;
    const calculationByIncrementDigitResult = await calculateCircumference({
      diameter: planetData.planet_diameter,
      digit: +incrDigit,
    });
    const { planetCircumference, piValueApproximation } =
      calculationByIncrementDigitResult;
    await dataModel.updatePlanetQuery({
      id: planetExistId,
      name: planetData.planet_name,
      diameter: planetData.planet_diameter,
      planetCircumference,
      digit: incrDigit,
      piValueApproximation,
    });
    res.status(200).send({
      successMessage:
        "Planet is already exist, we update the PI accuracy instead!",
    });
  } catch (error) {
    logger.error(error);
    console.log(error.message);
    res.status(400).send({
      errorMessage: "Planet already exist but we failed to update the data!",
    });
  }
};

const updatePlanetController = async (req, res, next) => {
  try {
    const planetData = req.body;
    const calculationByIncrementDigitResult = await calculateCircumference({
      diameter: planetData.diameter,
      digit: planetData.digit,
    });
    const { planetCircumference, piValueApproximation } =
      calculationByIncrementDigitResult;
    await dataModel.updatePlanetQuery({
      id: planetData.id,
      name: planetData.name,
      diameter: planetData.diameter,
      planetCircumference,
      digit: planetData.digit,
      piValueApproximation,
    });
    res.status(200).send({ successMessage: "Succesfully update planet data!" });
  } catch (error) {
    logger.error(error);
    res.status(400).send({ errorMessage: "Failed to update planet data!" });
  }
};

const deletePlanetController = async (req, res, next) => {
  try {
    const planetData = req.params.planetId;
    console.log(planetData, "planetData delete");
    await dataModel.deletePlanetQuery(planetData);
    res.status(200).send({ successMessage: "Successfully delete planet!" });
  } catch (error) {
    logger.error(error);
    res.status(400).send({ errorMessage: "Failed to delete planet!" });
  }
};

// const getCurrentDigitController = async (req, res, next) => {
//   try {
//     const data = req.body;
//     const currentDigit = await dataModel.getCurrentDigitQuery(data);
//     console.log
//   }
// }

const calculateCircumference = async (data) => {
  console.log(data, "calculateCircumference data");

  let planetCircumference;
  try {
    const { diameter, digit } = data;
    const piValueApproximation = await computePI(digit);
    planetCircumference = await (+diameter * +piValueApproximation);
    console.log(piValueApproximation, "piValueApproximation");
    const result = {
      piValueApproximation,
      planetCircumference,
    };
    return result;
  } catch (error) {
    logger.error(error);
    console.log(error);
  }
};

// const updatePlanet = async (data) => {
//   try {
//     await dataModel.updatePlanetQuery(data);

//   }
// }

module.exports = {
  selectAllResultController,
  insertPlanetIncrementController,
  insertPlanetController,
  updatePlanetController,
  deletePlanetController,
  selectAllPlanetsController_PG,
  insertPiCurrentValueController_PGSQL,
  insertPlanetController_PGSQL,
  findPlanetController_PGSQL,
  updatePlanetController_PGSQL,
  deletePlanetController_PGSQL,
};
