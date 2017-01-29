import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let ItemSchema = new Schema({
  id: Number,
  name: String
});

let Item = mongoose.model('Item', ItemSchema);

export default Item;