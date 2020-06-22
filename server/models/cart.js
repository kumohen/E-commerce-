const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const cartSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
  },
  image: [
    {
      type: String,
    },
  ],
  category: {
    type: String,
  },
  displaySize: {
    type: Number,
  },
  color: {
    type: String,
  },
  ram: {
    type: Number,
  },
  storage: {
    type: Number,
  },
  battery: {
    type: Number,
  },
  reviews: [
    {
      text: Number,
      postedBy: { type: ObjectId, ref: "User" },
    },
  ],
  comments: [
    {
      text: String,
      postedBy: { type: ObjectId, ref: "User" },
    },
  ],

  postedBy: {
    type: ObjectId,
    ref: "User",
  },
  sells: [{ type: ObjectId, ref: "User" }],
});

mongoose.model("Cart", cartSchema);
