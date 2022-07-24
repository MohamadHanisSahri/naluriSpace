const express = require("express");
const dataController = require("../controller");
const router = express.Router();

const {
  selectAllResultController,
  insertPlanetIncrementController,
  insertPlanetController,
  updatePlanetController,
  deletePlanetController,
} = dataController;

router.get("/select-planets", selectAllResultController);
router.post("/insert-incr-digit-planet", insertPlanetIncrementController);
router.post("/insert-planet", insertPlanetController);
router.put("/update-planet", updatePlanetController);
router.delete("/delete-planet/:planetId", deletePlanetController);

module.exports = {
  routes: router,
};
