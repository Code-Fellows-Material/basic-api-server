'use strict';

const express = require('express');
const {dogModel} = require('../models/index');

const router = express.Router(); 

router.get('/dog', read);
router.get('/dog/:id', read);
router.post('/dog', create);
router.patch('/dog/:id', update);
router.put('/dog/:id', updateAll);
router.delete('/dog/:id', remove);

async function read(req, res, next) {
  try{
    console.log('GET HIT');
    let { id } = req.params;
    let dogs;
    if (id) {
      dogs = await dogModel.findOne({where: {id}});
    } else {
      dogs = await dogModel.findAll();
    }
  
    let resObject = {
      count: dogs ? dogs.length : 1,
      results: dogs,
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
    const dogObj = await dogModel.create(updateObj);
    res.status(201).json(dogObj);
  }catch (err){
    res.status(500).send(err);
  }
}

async function update(req, res, next) {
  try{
    console.log('PATCH HIT: ');
    let {id} = req.params;
    let updateObj = req.body;
    if(id){
      let responce = await dogModel.update(updateObj, {
        where: {
          id: id,
        },
      });
      console.log(responce);
      let dog = await dogModel.findOne({where: {id}});
      res.status(202).json(dog);
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
      let response = await dogModel.update(updateObj, {
        where: {
          id: id,
        },
      });
      console.log(response);
      let dog = await dogModel.findOne({where: {id}});
      res.status(202).json(dog);
    }
  } catch (err){
    res.status(500).send(err);
  }
}

async function remove(req, res, next) {
  try{
    console.log('DELETE HIT');
    let {id} = req.params;
    await dogModel.destroy({
      where: {
        id: id,
      },
    });
    let dog = await dogModel.findOne({where: {id}});
    console.log(dog);
    res.status(204).send(dog);
  } catch (err){
    res.status(500).send(err);
  }
}

module.exports = router;