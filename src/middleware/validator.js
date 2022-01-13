'use strict';

function validator(req, res, next) {
  let name = req.query.name;

  if(!name) {
    next('NO NAME INCLUDED');
  } else {
    console.log('Name include in request:', name);
    next();
  }
}


module.exports = validator;