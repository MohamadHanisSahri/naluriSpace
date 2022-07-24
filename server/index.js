const express = require("express");
const cors = require("cors");
const config = require("./config");
const dataRoutes = require("./routes");
const path = __dirname + "/client/build";

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

app.use(express.static(__dirname + "/client/build"));
app.get("/", (req, res) => {
  res.sendFile(path + "index.html");
});

app.use("/api", dataRoutes.routes);

app.listen(config.port, () => {
  console.log("Server is listening on http://localhost:" + config.port);
});
