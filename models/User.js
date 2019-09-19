const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  facebookId: String,
  itinerary: {
    type: Schema.Types.ObjectId,
    ref: "Itinerary"
  }

});

const User = mongoose.model("User", userSchema);

module.exports = User;
