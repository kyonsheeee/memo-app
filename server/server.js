const express = require("express");
const mongoose = require("mongoose");
const itemRoutes = require("./routes/itemRoutes");

const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost:27017/memo-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use(express.json());

app.use("/api", itemRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
