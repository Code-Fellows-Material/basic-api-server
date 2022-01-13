'use strict';

const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server.app);


describe('Testing if the server is given an unknown route', () => {

  it('Should respond to the client with error code 404', async () => {
    let response = await request.post('/someRandomRouteThatDoesntExist');
    expect(response.status).toEqual(404);
  });
  
});

describe('Testing if the server is given no name', () => {

  it('Should respond to the client with error code 500', async () => {
    let response = await request.post('/person/?name=');
    expect(response.status).toEqual(500);
  });
  
});