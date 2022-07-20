const express = require("express");
const cors = require("cors");
const router = express.Router();
const config = require("./config");
const dataRoutes = require("./routes");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X_Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT"
  );
  next();
});

app.use("/api", dataRoutes.routes);

app.listen(config.port, () => {
  console.log("Server is listening on http://localhost:" + config.port);
});
