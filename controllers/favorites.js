const Favorite = require('../models/Favorite');
const Rental = require('../models/Rental');

exports.addFavorite = async (req, res)=>{
    try{
        const userId = req.session.userId;
        const rentalBasket = await Rental.find({user: userId, _id: req.params.id});
        if(!rentalBasket){
            res.status(400).json({message: 'No Rental' });
        }
        let fav = new Favorite({
            user: userId,
            movie: rentalBasket.movie
        });
        await fav.save();
    res.status(200).json({message: "Adding to Favorites successful"});
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}
exports.getFavorites = async (req, res) =>{
    try{
        const userId = req.session.userId;
        const favBasket = await Favorite.find({user: userId});
        if(!favBasket){
            res.status(400).json({message: 'No Favorites' });
        }
        res.json(favBasket);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

exports.getFavoritesById = async (req, res) =>{
    try{
        const userId = req.session.userId;
        const favBasket = await Favorite.findOne({user: userId , _id: req.params.id});
        if(!favBasket){
            res.status(400).json({message: 'No Favorites' });
        }
        res.json(favBasket);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}
exports.deleteFavoriteById = async (req, res)  =>{
    try{
        const userId = req.session.userId;
        const favBasket = await Favorite.findOne({user: userId , _id: req.params.id});
        
        if(!favBasket){
            return res.status(404).json({message: "No Favorite Found"});
        }

        await Favorite.deleteOne({user: userId, _id: req.params.id});
        res.status(200).json({message: "Favorite deleted successfully"});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};
