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
        radius: planetData.radius,
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
    await dataModel.updatePlanetController({
      name: planetData.name,
      radius: planetData.radius,
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
      await dataModel.insertPlanetSurfaceQuery({
        name: planetData.name,
        radius: planetData.radius,
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
    const incrDigit = +planetExist.Pi_Digit + 1;
    const calculationByIncrementDigitResult = await calculateCircumference({
      diameter: planetData.diameter,
      digit: +incrDigit,
    });
    const { planetCircumference, piValueApproximation } =
      calculationByIncrementDigitResult;
    await dataModel.updatePlanetController({
      name: planetData.name,
      radius: planetData.radius,
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
//     await dataModel.updatePlanetController(data);

//   }
// }

module.exports = {
  selectAllResultController,
  insertPlanetIncrementController,
  insertPlanetController,
};
