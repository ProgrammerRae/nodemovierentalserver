const express = require('express');
const express_session = require('express-session');
const multer = require('multer');
const router = express.Router();
const upload = multer();

const { 
    getOneUser,  
    getAllUser, 
    updateUser,
    deleteUser,
    getLoggedUser
    } =  require('./controllers/users');
const {
    getGenre, 
    getMovieByGenreandSearch,
    getMoviesList
} = require('./controllers/genres');
const {
    getAllMovie, 
    getOneMovieById, 
    updateMovie, 
    deleteMovie,
    addMovie,
    getFeaturedMovies,
    getLatestMovies
    } = require('./controllers/movies');
const {
    getAllRentals, 
    getOneRental, 
    getAllUserRentals, 
    getOneUserRental
    }= require('./controllers/rentals')
const {
    addToCart,
    getUserCart,
    getOneCart,
    putToUserRent,
    deleteCartById
} = require('./controllers/cart');

const {
    registerUser,
    authenticateUser,
    logout
} = require('./controllers/accounts');
const {
    searchMovies
} = require('./controllers/search');
const { 
    addFavorite, 
    getFavorites, 
    getFavoritesById, 
    deleteFavoriteById 
} = require('./controllers/favorites');
const {
    checkUserLoggedIn
} = require('./controllers/admin');

//user
router.get('/api/users/list', getAllUser);
router.get('/api/users/:_id' , getOneUser);
router.delete('/admin/users/delete/:id', deleteUser);
router.put('/admin/users/update/:id', updateUser);
router.get('/api/loggeduser', getLoggedUser);

router.get('/somepath', function(req, res){
    console.log(req.session);
  });
//router.get('/api/search', searchMovies);

router.post('/api/accounts/auth',upload.none(), authenticateUser);
router.post('/api/accounts/register',upload.none(), registerUser);

//genre
router.get('/api/genres', getGenre);
router.get('/api/movies/genre', getMovieByGenreandSearch);
router.post('/api/movies/list',upload.none(), getMoviesList);
//movie
router.get('/api/movies', getAllMovie);
router.get('/api/movies/:id', getOneMovieById);
router.put('/admin/movies/update/:id', updateMovie);
router.delete('/admin/movies/delete/:id', deleteMovie);
router.post('/admin/movies/add',upload.none(), addMovie);
router.get('/api/movies/featured', getFeaturedMovies);
router.get('/api/movies/latest', getLatestMovies);

router.get('/', (req, res) => {
    res.send('Hello, World!');
  });

//cart
router.post('/api/cart/add',upload.none(), addToCart);
router.get('/api/cart', checkUserLoggedIn, getUserCart);
router.get('/api/cart/:id', getOneCart);
router.put('/api/cart/checkout/:id', putToUserRent);
router.delete('/api/cart/:id', deleteCartById);

//rentals
router.get('/api/rentals', getAllRentals);
router.get('/api/rentals/:id', getOneRental);
router.get('/api/user/rentals', getAllUserRentals);
router.get('/api/user/rentals/:id', getOneUserRental);

//favorite
router.post('/api/favorites/add',upload.none(), addFavorite);
router.get('/api/favorites', getFavorites);
router.get('/api/favorites/:id', getFavoritesById);
router.delete('/api/favorites/:id', deleteFavoriteById);

module.exports = router;

