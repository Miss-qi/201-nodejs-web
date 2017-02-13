import items from './routers/items';
import category from './routers/categories';
import cart from './routers/carts';

export default function (app) {
  app.use('/items', items);
  app.use('/category', category);
  app.use('/cart', cart);
}