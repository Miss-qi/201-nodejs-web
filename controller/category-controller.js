const async = require('async');

const Category = require('../model/category');
const Item = require('../model/item');
const constant = require('../config/constant');

class CategoryController {
  getAll(req, res, next) {
    async.series({
      items: (done) => {
        Category.find({}, done);
      },
      totalCount: (done) => {
        Category.count(done);
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
    const category = req.params.categoryId;

    async.waterfall([
      (done) => {
        Item.findOne({category}, done);
      },
      (docs, done) => {
        if (docs) {
          done(true, null);
        } else {
          Category.findByIdAndRemove(category, (err, doc) => {
            if (!doc) {
              return done(false, null);
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
    })
  }

  create(req, res, next) {
    Category.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.CREATED).send({uri: `categories/${doc._id}`});
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