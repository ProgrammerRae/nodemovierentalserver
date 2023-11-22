const Cart = require('../models/Cart');
const Movie = require('../models/Movie');
const Rental = require('../models/Rental'); 


exports.addToCart = async (req, res) => {
  try {
    const userId = req.session.userId; 
    const { movieId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      let itemIndex = cart.items.findIndex(item => item.movie.toString() === movieId);

      if (itemIndex > -1) {
        let item = cart.items[itemIndex];
        item.quantity += quantity;
        cart.items[itemIndex] = item;
      } else {
        cart.items.push({ movie: movieId, quantity });
      }

      cart = await cart.save();
      res.status(200).send(cart);
    } else {
      const newCart = await Cart.create({
        user: userId,
        items: [{ movie: movieId, quantity }]
      });

      res.status(200).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
}

exports.getUserCart =  async (req, res) =>{
  try{
    const userId = req.session.userId;
    const userCart = await Cart.find({user: userId});
    if(!userCart){
      res.status(400).json({message: "No Pending Items"});
    }
    res.json(userCart);
  }
  catch(err){
    res.status(500).json(err.message);
  }
}
exports.getOneCart = async(req, res)=>{
  try{
    const userId = req.session.userId;
    const userCart = await Cart.findOne({user: userId , _id: req.params.id});
    if(!userCart){
      res.status(400).json({message: "No Pending Items"});
    }
    res.json(userCart);
  }
  catch(err){
    res.status(500).json(err.message);
  }
}
exports.putToUserRent = async (req, res) => {
  try {
    const userId = req.session.userId;
    const userItemCart = await Cart.findOne({user: userId , _id: req.params.id});
    
    if(!userItemCart){
      res.status(400).json({message: "No Items"});
      return;
    }
    const rentTotal= await userItemCart.getTotalAmount();
    let startDate = new Date();
    let endDate = new Date();
    endDate.setDate(startDate.getDate() + 7);
    
    let rental = new Rental({
      user: userId,
      movie: userItemCart.movie,
      startDate: startDate,
      endDate: endDate,
      rent_total: rentTotal
    });
    
    await rental.save();
    
    await Cart.deleteOne({user: userId, _id: req.params.id});
    
    res.status(200).json({message: "Checkout successful, items moved to rentals"});
  } catch(err) {
    console.error(err);
    res.status(500).json({message: "An error occurred"});
  }
};
exports.deleteCartById = async (req, res)  =>{
  try{
      const userId = req.session.userId;
      const cartBasket = await Cart.findOne({user: userId , _id: req.params.id});
      
      if(!cartBasket){
          return res.status(404).json({message: "No Favorite Found"});
      }

      await Cart.deleteOne({user: userId, _id: req.params.id});
      res.status(200).json({message: "Cart deleted successfully"});
  }
  catch(err){
      res.status(500).json({message: err.message});
  }
};


