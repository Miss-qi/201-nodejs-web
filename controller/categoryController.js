const Category = require('../models/category');
const Item = require('../models/item');
const constant = require('../config/constant');

class CategoryController{
  getAll(req, res, next) {
    Category.find({})
  }
}