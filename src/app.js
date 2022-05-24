/** @format */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const middlewareError = require("./middlewares/error");
const databaseConnection = require('./config/mongodb');

const app = express();

databaseConnection();

const accessLogStream = fs.createWriteStream(
  path.resolve('access.log'),
  { flags: 'a' }
);
app.use(cors());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes'));
app.use(middlewareError);

module.exports = app;
