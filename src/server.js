'use strict';

const cors = require("cors");

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

const dogRoutes = require('./routes/dog');
const foodRoutes = require('./routes/food');

const logger = require('./middleware/logger');
const express = require('express');

const app = express();
app.use(cors(corsOptions));

//-------------------------- Middleware --------------------------

app.use(express.json()); // Turn a JSON String into valid JSON
app.use(dogRoutes);
app.use(foodRoutes);
app.use(logger); //Console log the method and path

module.exports = {
  start: (port) => {
    app.listen(port, () => console.log('listening on: ', port));
  },
  app,
};