const mongoose = require('mongoose');
const Genre = require('./Genre');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    director: {
      type: String,
      required: true
    },
    genre: [{
      type: String,
      ref: 'Genre',
      required: true
    }],
    rating: {
      type: Number,
      min: 0,
      max: 10
    },
    rental_price:{
      type: Number,
      required: true,
      min: 0
    },
    image: {
      type: String,
      required: true
    },
    record_movie: {
      type: String,
      required: true
    },
    upload_date: {
      type: Date,
      default: Date.now,
      required: true
    },
    description:{
      type: String,
      required: true,
    }, 
    featured: {
      type: Boolean,
      default: false
    }
  });
  
  MovieSchema.pre('save', function(next) {
    Promise.all(this.genre.map(genre => Genre.findOne({ name: genre })))
      .then(genres => {
        if (genres.some(genre => !genre)) throw new Error('Invalid genre');
        next();
      })
      .catch(next);
  });
  const Movie = mongoose.model('Movie', MovieSchema);
  
module.exports = Movie;