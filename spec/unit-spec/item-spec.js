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

  it('GET /items/:itemId should return one item', (done) => {
    request
        .get('/items/587f0f2586653d19297d40c3')
        .expect(200)
        .expect((res) => {
          res.body.should.eql({
            "_id": "587f0f2586653d19297d40c3",
            "name": "苹果",
            "price": 1,
            "category": {
              "_id": "587f0f2586653d19297d40c8",
              "name": "水果",
              "__v": 0
            },
            "__v": 0
          })
        })
        .end(done);
  });

  it('POST /items should insert an item and return uri', (done) => {
    const item = {
      name: '梨',
      price: 5,
      category: '587f0f2586653d19297d40c8'
    };

    request
        .post('/items')
        .send(item)
        .expect(201)
        .expect((res) => {
          Item.findOne(item, (err, doc) => {
            res.body.uri.should.equal(`items/${doc._id}`);
          });
        })
        .end(done);
  });

  it('DELETE /items/:itemId should delete one item and return status', (done) => {
    const itemId = '587f0f2586653d19297d40c4';
    
    request
        .delete(`/items/${itemId}`)
        .expect(204)
        .end(done)
  });

  it('PUT /items/:itemId should update the item and return 204', (done) => {
    const itemId = '587f0f2586653d19297d40c3';
    const item = {
      name: '桂圆',
      price: 22,
      category: '587f0f2586653d19297d40c8'
    };

    request
        .put(`/items/${itemId}`)
        .send(item)
        .expect(204)
        .end(done)
  });
});
