const items = require('./router/items');
const category = require('./router/categories');
const cart = require('./router/carts');

module.exports = function (app) {
  app.use('/items', items);
  app.use('/categories', category);
  app.use('/carts', cart);
};