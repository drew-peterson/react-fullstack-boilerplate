const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  _oAuthId: {
    type: String
  },
  credits: {
    type: Number,
    default: 0
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  }
});

mongoose.model("user", userSchema);
