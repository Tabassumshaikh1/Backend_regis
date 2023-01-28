const express = require('express');
const mongoose = require('mongoose');
const port = 8080;
const cors = require("cors");
const app = express();
const path = require("path");
app.use(express.static("public"));
app.use(express.json());
app.use("/Images",express.static("uploads"))
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);
const connectionString = "mongodb+srv://farman:XBS2EBPZtw1ttHW5@cluster0.hema1l7.mongodb.net/Compfi?retryWrites=true&w=majority";
mongoose
  .connect(connectionString)
  .then((res) => console.log("database Connected"))
    .catch((err) => console.log("Erroe:" + err)); 
  const mainRoutes = require("./route");
const { urlencoded } = require('express');
app.use("/", mainRoutes);
app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Work on ${port}`);
});