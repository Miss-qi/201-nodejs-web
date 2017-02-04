import Category from '../models/category';
import Item from '../models/item';
import async from 'async';

export default class CategoryController {
  getAllCategories(req, res, next) {
    Category.find({}, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.send(doc);
    });
  }

  getCategoryById(req, res, next) {
    let categoryId = req.params.categoryId;

    Category.findOne({categoryId}, (err, doc)=> {
      if (err) {
        return next(err);
      }
      console.log(JSON.stringify(doc, null, 2));
      return res.send(doc);
    })
  }

  addCategory(req, res, next) {
    let categoryId = req.body.categoryId;
    let categoryName = req.body.categoryName;

    Category.create({categoryId, categoryName});
    return res.send('create one category');
  }

  addItemForCategory(req, res, next) {
    let categoryId = req.params.categoryId;
    let itemId = req.params.itemId;

    async.waterfall([
      (done) => {
        Category.findOne({categoryId}, done);
      },
      (doc, done) => {
        Item.findOne({id: itemId}, (err, docs) => {
          if (err) {
            return next(err);
          } else {
            let temp = doc.items.find(item=>item.toString() === docs._id.toString());
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
      return res.send('add success');
    });
  }

  deleteCategory(req, res, next) {
    let categoryId = req.params.categoryId;

    Category.remove({categoryId}, (err) => {
      if (err) {
        return next(err);
      }
      return res.send('delete one category');
    });
  }

  updateCategory(req, res, next) {
    let categoryId = req.params.categoryId;
    let categoryName = req.body.categoryName;

    Category.update({categoryId}, {categoryName}, (err) => {
      if (err) {
        return next(err);
      }
      return res.send('update this category');
    });
  }

  deleteItemForCategory(req, res, next) {
    let categoryId = req.params.categoryId;
    let itemId = req.params.itemId;

    async.waterfall([
      (done) => {
        Category.findOne({categoryId}, done);
      },
      (doc, done) => {
        Item.findOne({id: itemId}, (err, docs) => {
          if (err) {
            return next(err);
          } else {
            let temp = doc.items.find(item=>item.toString() === docs._id.toString());
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
      return res.send('delete one item from category')
    })
  }

}
