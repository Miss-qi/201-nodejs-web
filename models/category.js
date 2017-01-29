import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let CategorySchema = new Schema({
  categoryId: Number,
  categoryName: String,
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }]
});

let Category = mongoose.model('Category', CategorySchema);
export default Category;