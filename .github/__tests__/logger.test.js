'use strict';

const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server.app);


describe('Testing if a name was given in our route', () => {

  it('Should create a new name object and send it back in the response', async () => {
    let response = await request.post('/person/?name=mya');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      name: 'mya',
    });
  });
});