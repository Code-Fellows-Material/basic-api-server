'use strict';

function serverError(err, req, res, next){


  if(err === 'NO NAME INCLUDED'){
    res.status(500).send('Server Error');
    console.error('ERROR: ', err);
  } else {
    next();
  } 
}

module.exports = serverError;