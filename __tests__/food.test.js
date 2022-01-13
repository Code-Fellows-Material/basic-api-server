'use strict';

const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server.app);

const { db } = require('../src/models');

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});


describe('Testing the food router', () => {

  it('should read ALL from foods data', async () => {
    const response = await request.get('/food');

    expect(response.status).toEqual(200);
    expect(response.body.count).toBeDefined();
    expect(response.body.results).toBeDefined();
  });

  it('should read ONE from foods data', async () => {
    const response = await request.get('/food/1');

    expect(response.status).toEqual(200);
    expect(response.body.count).toEqual(1);
    expect(response.body.results).toBeDefined();
  });

  it('should CREATE one from foods data', async () => {
    const response = await (await request.post('/food')).body('{"food": "test", "meal": "test"}');
    expect(response.status).toEqual(201);
  });

  it('should UPDATE one from foods data', async () => {
    const response = await request.get('/food/1');
    expect(response.status).toEqual(202);
  });
});