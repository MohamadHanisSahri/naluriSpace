const dataModel = require("../model");
const { computePI } = require("../computation/pi_digitComputation");

const selectAllResultController = async (req, res, next) => {
  try {
    const getData = await dataModel.selectAllResultQuery();
    res.send(getData);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const insertPlanetSurfaceController = async (req, res, next) => {
  const data = req.body;
  let planetExist = false;

  try {
    planetExist = await dataModel.getCurrentDigitQuery(data.name);
  } catch (error) {
    console.log(error.message);
  }

  if (planetExist.lenght > 0) {
    next();
  } else {
    res.status(200).send("");
    return;
  }

  try {
    console.log(data, "body");
    const calculationResult = await calculateCircumference(data);
    console.log(calculationResult, "after calculate");
    await dataModel.insertPlanetSurfaceQuery(calculationResult);
    res.status(200).send("successfully save data");
  } catch (error) {
    console.log(error);
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
  let planetCircumference;
  try {
    const { name, radius, diameter, digit } = data;
    const piValueApproximation = await +computePI(digit);
    planetCircumference = await +(+diameter * +piValueApproximation);
    const result = {
      name,
      radius,
      diameter,
      digit,
      piValueApproximation,
      planetCircumference,
    };
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updatePlanet = async (data) => {
  try {
    
  }
}

module.exports = {
  selectAllResultController,
  insertPlanetSurfaceController,
};
