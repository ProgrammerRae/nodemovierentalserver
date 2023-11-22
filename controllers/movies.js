const Movie = require('../models/Movie');

exports.getAllMovie = async (req, res) =>{
    try{
        const movie = await Movie.find();
        if(!movie){
            res.status(400).json({message:'No Movie Found'})
        }
        res.json(movie);
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

exports.getOneMovieById= async (req, res) =>{
    try{
        const movieID = await Movie.findById(req.params.id);
        if(!movieID){
            res.status(400).json({message:'No Movie Found'})
        }
        res.json(movieID);
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

  exports.updateMovie = async (req, res) => {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!updatedMovie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      res.json({ message: 'Movie updated successfully', updatedMovie });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  
  exports.deleteMovie = async (req, res) => {
    try {
      const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
  
      if (!deletedMovie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      res.json({ message: 'Movie deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  exports.addMovie = async (req, res) => {
    try {
      const newMovie = new Movie(req.body);
      await newMovie.save();
      res.status(201).json({ message: 'Movie added successfully', movie: newMovie });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  exports.getLatestMovies= async(req, res)=>{
    try {
      const latestMovie = await Movie.findOne().sort({upload_date: -1});
      if(!latestMovie){
          res.status(400).json({message:'No Latest Movie Found'})
      }
      res.json(latestMovie);
    }
    catch(err){
      res.status(500).json({message: err.message})
    }
  }

  exports.getFeaturedMovies = async (req, res) => {
    try {
        const featuredMovies = await Movie.find({featured: true});
        if(!featuredMovies || featuredMovies.length === 0){
            res.status(400).json({message:'No Featured Movies Found'})
        }
        res.json(featuredMovies);
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

  