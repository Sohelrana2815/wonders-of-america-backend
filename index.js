{
  /* 
    DB_USER: wonders-of-america
    DB_PASS: tnaZoIv35RxwC12k
    */
}
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
//Middleware
app.use(express.json());
app.use(cors());
