const Item = require('../model/item');
const constant = require('../config/constant');
const async = require('async');

class ItemController{

  getAll(req, res, next) {
    async.series({
      items: (cb) => {
        Item.find({})
            .populate('category')
            .exec(cb)
      },
      totalCount: (cb) => {
        Item.count(cb);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.OK).send(result);
    });
  }

  getOne(req, res, next) {
    const itemId = req.params.itemId;
    Item.findById(itemId)
        .populate('category')
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
    const itemId = req.params.itemId;
    Item.findByIdAndRemove(itemId, (err, doc) => {
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
    Item.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.CREATED).send({uri: 'items/' + doc._id});
    });
  }

  update(req, res, next) {
    const itemId = req.params.itemId;
    Item.findByIdAndUpdate(itemId, req.body, (err, doc) => {
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

module.exports = ItemController;