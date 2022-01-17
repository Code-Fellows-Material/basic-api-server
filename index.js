'use strict';

require('dotenv').config();

const { db } = require('./src/models');
const { start } = require('./src/server.js');

const PORT =  process.env.PORT;

db.sync()
  .then(() => start(PORT))
  .catch(err => console.log(err));