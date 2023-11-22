const mongoose = require('mongoose');
const  Schema  = mongoose.Schema;

const favoriteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
