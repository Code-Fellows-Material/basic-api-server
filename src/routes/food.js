'use strict';

const express = require('express');
const {foodModel} = require('../models/index');

const router = express.Router(); 

router.get('/food', read);
router.get('/food/:id', read);
router.post('/food', create);
router.put('/food/:id', update);
router.put('/food/:id', updateAll);
router.delete('/food/:id', remove);

async function read(req, res, next) {
  try{
    console.log('GET HIT');
    let { id } = req.params;
    let foods;
    if (id) {
      foods = await foodModel.findOne({where: {id}});
    } else {
      foods = await foodModel.findAll();
    }
  
    let resObject = {
      count: foods ? foods.length : 1,
      results: foods,
    };
    res.status(200).json(resObject);
  } catch (err){
    res.status(404).send(err);
  }
}

async function create(req, res, next) {
  console.log('POST HIT: ');
  try{
    let updateObj = req.body;
    const foodObj = await foodModel.create(updateObj);
    res.status(201).json(foodObj);
  }catch (err){
    res.status(500).send(err);
  }
}

async function update(req, res, next) {
  try{
    console.log('PUT HIT: ');
    let {id} = req.params;
    let updateObj = req.body;
    if(id){
      let responce = await foodModel.update(updateObj, {
        where: {
          id: id,
        },
      });
      console.log(responce);
      let food = await foodModel.findOne({where: {id}});
      res.status(202).json(food);
    }
  } catch (err){
    res.status(500).send(err);
  }
}

async function updateAll(req, res, next) {
  try{
    console.log('PATCH HIT: ');
    let {id} = req.params;
    let updateObj = req.body;
    if(id){
      let responce = await foodModel.update(updateObj, {
        where: {
          id: id,
        },
      });
      console.log(responce);
      let food = await foodModel.findOne({where: {id}});
      res.status(202).json(food);
    }
  } catch (err){
    res.status(500).send(err);
  }
}

async function remove(req, res, next) {
  try{
    console.log('DELETE HIT');
    let {id} = req.params;
    await foodModel.destroy({
      where: {
        id: id,
      },
    });
    let food = await foodModel.findOne({where: {id}});
    console.log(food);
    res.status(204).send(food);
  } catch (err){
    res.status(500).send(err);
  }
}

module.exports = router;