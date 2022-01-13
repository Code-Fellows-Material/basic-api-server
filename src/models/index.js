'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const POSTGRES_URI = process.env.POSTGRES_URI || 'sqlite:memory';

const foodSchema = require('./food.schema.js');
const dogSchema = require('./dog.schema.js');

let db = new Sequelize(POSTGRES_URI);

const foodModel = foodSchema(db, DataTypes);
const dogModel = dogSchema(db, DataTypes);

module.exports = {
  db, 
  foodModel,
  dogModel,
};

