import Cart from '../models/cart';
import Item from '../models/item';
import async from 'async';

//FIXME cartNumber change to cart._id
export default class CartController {
  getAllCarts(req, res, next) {
    Cart.find({}, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.send(doc);
    });
  }

  getOneCartById(req, res, next) {
    let cartNumber = req.params.cartNumber;

    Cart.findOne({cartNumber}, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.send(doc);
    });
  }

  addCart(req, res, next) {
    let cartNumber = req.body.cartNumber;

    Cart.create({cartNumber});
    return res.send('create a cart');
  }

  addItemForCart(req, res, next) {
    let cartNumber = req.params.cartNumber;
    let itemId = req.params.itemId;

    async.waterfall([
      (done) => {
        Cart.findOne({cartNumber}, done);
      },
      (doc, done) => {
        console.log(doc, 'doc');
        Item.findOne({id: itemId}, (err, docs) => {
          if (err) {
            return next(err);
          } else {
            console.log(docs, 'docs');
            let temp = doc.items.find(item => item.toString() === docs._id.toString());
            if (!temp) {
              doc.items.push(docs._id);
              doc.save(done);
            } else {
              done(null, null);
            }
          }
        });
      }
    ], (err) => {
      if (err) {
        return next(err);
      }
      return res.send('add an item for cart');
    });
  }

  deleteCart(req, res, next) {
    let cartNumber = req.params.cartNumber;

    Cart.remove({cartNumber}, (err) => {
      if (err) {
        return next(err);
      }
      return res.send('delete one cart');
    });
  }

  deleteItemFromCart(req, res, next) {
    let cartNumber = req.params.cartNumber;
    let itemId = req.params.itemId;

    async.waterfall([
      (done) => {
        Cart.findOne({cartNumber}, done)
      },
      (doc, done) => {
        Item.findOne({id: itemId}, (err, docs) => {
          if (err) {
            return next(err);
          } else {
            let temp = doc.items.find(item => item.toString() === docs._id.toString());
            if (temp) {
              doc.items.remove(docs._id);
              doc.save(done);
            } else {
              done(null, null);
            }
          }
        });
      }
    ], (err) => {
      if (err) {
        return next(err);
      }
      return res.send('delete one item form cart');
    });
  }
}