const Rental = require('../models/Rental');

exports.getAllRentals = async (req, res) => {
    try{
      const rents = await Rental.find();
      res.json(rents);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}
exports.getOneRental = async (req, res) => {
    try{
        const rent = await Rental.findById(req.params.id);
        if(!rent){
            return res.status(400).json({message: "No Rentals Available"});
        }
        res.json(rent);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
exports.getAllUserRentals = async (req, res) => {
    try{
      const userId = req.session.userId;
      const rents = await Rental.find({ user: userId });
      res.json(rents);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}
exports.getOneUserRental = async (req, res) => {
    try{
        const userId = req.session.userId;
        const rent = await Rental.findOne({ _id: req.params.id, user: userId });
        if(!rent){
            return res.status(404).json({message: "No Rental Found"});
        }
        res.json(rent);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


