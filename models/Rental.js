const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RentalSchema = new Schema({
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  rent_total: {
    type: Number,
    required: true
  }
});

const Rental = mongoose.model('Rental', RentalSchema);
module.exports = Rental;
