import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let CartSchema = new Schema({
  cartNumber: String,
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }]
});

let Cart = mongoose.model('Cart', CartSchema);
export default Cart;