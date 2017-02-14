const Cart = require('../model/cart');
const constant = require('../config/constant');
const async = require('async');

class CartController {

  getAll(req, res, next) {
    async.series({
      items: (cb) => {
        Cart.find({})
            .populate('items.item')
            .exec(cb);
      },
      totalCount: (cb) => {
        Cart.count(cb);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.OK).send(result);
    });
  }

  getOne(req, res, next) {
    const cartId = req.params.cartId;
    Cart.findById(cartId)
        .populate('items.item')
        .exec((err, doc) => {
          if (err) {
            return next(err);
          }
          if (!doc) {
            return res.sendStatus(constant.NOT_FOUND);
          }
          return res.status(constant.OK).send(doc);
        });
  }

  delete(req, res, next) {
    const cartId = req.params.cartId;
    Cart.findOneAndRemove({'_id': cartId}, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.NOT_FOUND);
      }
      return res.sendStatus(constant.NO_CONTENT);
    });
  }

  create(req, res, next) {
    Cart.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.CREATED).send({uri: 'carts/' + doc._id});
    });
  }

  update(req, res, next) {
    const cartId = req.params.cartId;
    Cart.findOneAndUpdate({'_id': cartId}, req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.NOT_FOUND);
      }
      return res.sendStatus(constant.NO_CONTENT);
    });
  }
}
module.exports = CartController;