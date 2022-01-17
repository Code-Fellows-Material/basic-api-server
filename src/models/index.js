'use strict';

require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');
//const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';
const DATABASE_URL = 'sqlite:memory';




const foodSchema = require('./food.schema.js');
const dogSchema = require('./dog.schema.js');

// let db = new Sequelize(DATABASE_URL); <------- regular.

// We have to add the second argument for heroku
let db = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const foodModel = foodSchema(db, DataTypes);
const dogModel = dogSchema(db, DataTypes);

module.exports = {
  db, 
  foodModel,
  dogModel,
};

