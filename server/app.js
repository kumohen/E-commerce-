const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const { MONGO_URI } = require("./keys");

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("mongodb is connected");
});

require("./models/cart");
require("./models/auth");

app.use(express.json());
app.use(cors());

app.use(require("./routes/cart"));
app.use(require("./routes/auth"));

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
