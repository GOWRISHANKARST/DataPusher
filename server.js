const express = require("express");
const bodyParser = require("body-parser");
const accountRoutes = require("./routes/accountRoutes");
const destinationRoutes = require("./routes/destinationRoutes");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/accounts", accountRoutes);
app.use("/destinations", destinationRoutes);

app.listen(PORT, () => {
  console.log('Server running at http://localhost:'+PORT);
});
