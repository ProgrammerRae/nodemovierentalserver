const Movie = require('../models/Movie'); 

exports.searchMovies = async (req, res) => {
  try {
    const searchTerm = req.query.title;
    const movies = await Movie.find({ title: new RegExp(searchTerm, 'i') });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};