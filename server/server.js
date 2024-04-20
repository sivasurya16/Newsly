// const express = require("express")
// const app = express()
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/my-mern-app', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Connected to MongoDB.');
// }).catch(error => {
//   console.error(error);
// });

// app.get("")


// app.listen(5000, () => console.log("sever started on port 5000"))

import express from "express";
import cors from "cors";
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);
// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});