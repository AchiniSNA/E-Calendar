const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const routes = require("./routes/routes");
require("dotenv/config");

const app = express();

// Enable CORS for all origins
app.use(cors());

app.use(express.json());
app.use(routes);

// Using swagger Ui for testing
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BOC E calendar application API Testing",
      version: "1.0.0",
    },
    servers: [
      {
        url:process.env.IP_URI,
      },
    ],
  },
  apis: ["./routes/routes*.js"],
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api_docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(process.env.DB_URI, dbOptions)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
