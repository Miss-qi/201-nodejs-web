require('should');
const supertest = require('supertest');

const express = require('express');
const app = require('../../app');
const request = supertest(app);

const Item = require('../../model/item');

describe('ItemController', ()=> {
  it('GET /items should return all items', (done) => {
    request
        .get('/items')
        .expect(200)
        .expect((res) => {
          res.body.totalCount.should.equal(2);
        })
        .end(done);
  });
});
