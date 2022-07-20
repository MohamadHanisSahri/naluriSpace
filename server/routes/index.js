const express = require("express");
const dataController = require("../controller");
const router = express.Router();

const { selectAllResultController, insertPlanetSurfaceController } =
  dataController;

router.get("/select-planets", selectAllResultController);
router.post("/insert-planet", insertPlanetSurfaceController);

module.exports = {
  routes: router,
};
