const Category = require('../model/category');
const Item = require('../model/item');
const constant = require('../config/constant');
const async = require('async');

class CategoryController{
  
  getAll(req, res, next) {
    async.series({
      items: (cb) => {
        Category.find({}, cb);
      },
      totalCount: (cb) => {
        Category.count(cb);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.OK).send(result);
    });
  }

  getOne(req, res, next) {
    const categoryId = req.params.categoryId;

    Category.findById(categoryId, (err, doc) => {
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
    const categoryId = req.params.categoryId;

    async.waterfall([
      (done) => {
        Item.findOne({categoryId}, done);
      },
      (data, done) => {
        if (data) {
          done(true, null);
        } else {
          Category.findByIdAndRemove(categoryId, (err, doc) => {
            if (!doc) {
              done(false, null);
            }
            done(err, doc);
          });
        }
      }
    ], (err) => {
      if (err === true) {
        return res.sendStatus(constant.BAD_REQUEST);
      }
      if (err === false) {
        return res.sendStatus(constant.NOT_FOUND);
      }
      if (err) {
        return next(err);
      }
      return res.sendStatus(constant.NO_CONTENT);
    });
  }

  create(req, res, next) {
    Category.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.CREATED).send({uri: 'categories/' + doc._id});
    });
  }

  update(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.findByIdAndUpdate(categoryId, req.body, (err, doc) => {
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

module.exports = CategoryController;