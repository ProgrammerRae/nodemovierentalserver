const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  ,
  items: [{
    movie: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }]
});

CartSchema.method('getTotalAmount', async function() {
  let total = 0;
  for (let item of this.items) {
    await item.movie.populate('movie').execPopulate();
    total += item.quantity * item.movie.rental_price;
  }
  return total;
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
