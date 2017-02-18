const rawData = require('./fixture/raw-data');
const Item = require('../model/item');
const Category = require('../model/category');
const Cart = require('../model/cart');

const modelMap = {
  Item,
  Category,
  Cart
};

let docs = Object.keys(rawData);

module.exports = function refresh() {
  docs.forEach((v) => {
    modelMap[v].remove(() => {
      modelMap[v].create(rawData[v], () => {
        docs = docs.filter(doc => doc !== v);
        if (docs.length === 0) {
          done();
        }
      });
    });
  });
};

