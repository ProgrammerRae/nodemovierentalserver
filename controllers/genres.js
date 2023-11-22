const Genre = require('../models/Genre');
const Movie = require('../models/Movie');

exports.getGenre =  async (req, res)=>{
    try{
        const genreBasket =  await Genre.find();
        if(!genreBasket){
            res.status[400].json({message: 'No Genre Available'});
        }
        res.json(genreBasket);
    }
    catch(err){
        res.status[500].json({message: err.message});
    }
}
exports.getMovieByGenreandSearch = async (req, res) => {
  try {
    let query = {};
    if (req.body.name) {
      const genre = await Genre.find(req.body.name);
      query.genre = { $in: [genre] };
      
    }
    if (req.body.searchTerm) {
      query.title = { $regex: new RegExp(req.body.searchTerm, 'i') };
    }
    const movies = await Movie.find(query);
    if (movies.length === 0) {
      res.status(404).send(`No Movies Available for Genre ${req.body.name ? genre : ''}`);
    } else {
      res.json(query,movies);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('No Existing Movie');
  }
}
exports.getMoviesList =  async (req, res)=>{
  const {genre, title} = req.body;
  let filter = {};
  if(genre && title){
    filter = {
      genre , title: new RegExp(title, 'i')
    }
  }
  else if(genre){
    filter = {
      genre
    }
  }
  else if(title){
    filter = {
      title: new RegExp(title, 'i')
    }
  }

  try{
    const genreBasket =  await Movie.find(filter);
    if(!genreBasket){
      res.status(400).json({message: 'No Genre Available'});
    }
    res.json(genreBasket);
  }
  catch(err){
    res.status(500).json({message: err.message});
  }
}
