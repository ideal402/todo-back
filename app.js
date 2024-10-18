const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require('dotenv').config()
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;

//기본 세팅
const app = express();

// CORS 설정
const corsOptions = {
  origin: 'https://todo-ideal.netlify.app', // 허용할 도메인
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use("/api", indexRouter);

// const mongoURI = "mongodb://localhost:27017/todo-demo";
const mongoURI = MONGODB_URI_PROD

mongoose.connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log("DB connection fail", error);
  });

app.listen(5050, () => {
  console.log("server on 5050");
});
