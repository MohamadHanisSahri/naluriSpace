const express = require("express");
const dataController = require("../controller");
const router = express.Router();

const {
  selectAllResultController,
  insertPlanetIncrementController,
  insertPlanetController,
} = dataController;

router.get("/select-planets", selectAllResultController);
router.post("/insert-incr-digit-planet", insertPlanetIncrementController);
router.post("/insert-planet", insertPlanetController);

module.exports = {
  routes: router,
};
