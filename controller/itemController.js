import Item from '../models/item';

export default class ItemController {
  getAll(req, res, next) {
    Item.find({}, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.send(doc);
    });
  }

  getOneById(req, res, next) {
    let id = req.params.id;

    Item.findOne({id}, (err, doc) => {
      if (err) {
        return next(err);
      } else {
        return res.send(doc);
      }
    });
  }

  addItem(req, res, next) {
    let id = req.body.id;
    let name = req.body.name;

    Item.create({id, name});
    return res.send('create one item');
  }

  deleteItem(req, res, next) {
    let id = req.params.id;

    Item.remove({id}, (err) => {
      if (err) {
        return next(err);
      }
      return res.send('delete one item');
    });
  }

  updateItem(req, res, next) {
    let id = req.params.id;
    let name = req.body.name;

    Item.update({id}, {name}, (err) => {
      if (err) {
        return next(err);
      }
      return res.send('update this item');
    });
  }
}
