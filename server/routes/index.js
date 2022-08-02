const express = require("express");
const dataController = require("../controller");
const router = express.Router();

const {
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
} = dataController;

// --------------------------------------------for pgsql
router.post("/insert-pi-current-value", insertPiCurrentValueController_PGSQL);
router.post("/insert-planet-pg", insertPlanetController_PGSQL);
router.get("/find-planet-pg/:planetId", findPlanetController_PGSQL);
router.delete("/delete-planet-pg/:planetId", deletePlanetController_PGSQL);
router.get("/select-planets-pg", selectAllPlanetsController_PG);
router.put("/update-planet-pg", updatePlanetController_PGSQL);
// --------------------------------------------for mysql
router.get("/select-planets", selectAllResultController);
router.post("/insert-incr-digit-planet", insertPlanetIncrementController);
router.post("/insert-planet", insertPlanetController);
router.put("/update-planet", updatePlanetController);
router.delete("/delete-planet/:planetId", deletePlanetController);

module.exports = {
  routes: router,
};
