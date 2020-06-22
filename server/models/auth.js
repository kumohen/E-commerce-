const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  zip: {
    type: String,
  },
  address: {
    type: String,
  },
  address2: {
    type: String,
  },
  city: {
    type: String,
  },
  stateName: {
    type: String,
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dvfpkko1z/image/upload/v1589020705/ahezd2fp0jb7qkmaeimc.jpg",
  },
});

mongoose.model("User", userSchema);
