const dataModel = require("../model");
const { computePI } = require("../computation/pi_digitComputation");
const logger = require("../logger");

const selectAllResultController = async (req, res, next) => {
  try {
    const getData = await dataModel.selectAllResultQuery();
    res.send(getData);
  } catch (error) {
    logger.error(error);
    res.status(400).send(error.message);
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
    planetExist = await dataModel.getCurrentDigitQuery(planetData.name);
    console.log(planetExist, "planetExist");
    planetExistDigit = planetExist.Pi_Digit;
    planetExistId = planetExist.Planet_ID;
  } catch (error) {
    logger.error(error);
    console.log(error.message);
  }

  if (!planetExist) {
    try {
      const calculateResult = await calculateCircumference({
        diameter: planetData.diameter,
        digit: 1,
      });
      const { planetCircumference, piValueApproximation } = calculateResult;
      await dataModel.insertPlanetSurfaceQuery({
        name: planetData.name,
        diameter: planetData.diameter,
        planetCircumference,
        digit: 1,
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
    const incrDigit = +planetExistDigit + 1;
    const calculationByIncrementDigitResult = await calculateCircumference({
      diameter: planetData.diameter,
      digit: +incrDigit,
    });
    const { planetCircumference, piValueApproximation } =
      calculationByIncrementDigitResult;
    await dataModel.updatePlanetQuery({
      id: planetExistId,
      name: planetData.name,
      diameter: planetData.diameter,
      planetCircumference,
      digit: incrDigit,
      piValueApproximation,
    });
    res.status(200).send("successfully updated");
  } catch (error) {
    logger.error(error);
    console.log(error.message);
    res.status(400).send(error.message);
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
    const piValueApproximation = await +computePI(digit);
    planetCircumference = await +(+diameter * +piValueApproximation);
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
};
