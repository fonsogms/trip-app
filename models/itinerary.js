const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItinerarySchema = new Schema({
    day:String,
    monuments:Array,
    museums:Array,
    restaurants:Array
});

const Itinerary = mongoose.model("User", ItinerarySchema);

module.exports = Itinerary;
