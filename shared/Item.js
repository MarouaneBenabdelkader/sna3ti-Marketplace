const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const { rateSchema } = require("./Rate");

const itemSchema = new mongoose.Schema({
  itemName: String,
  owner: {
    type: ObjectId,
    ref: "Handicraft",
  },
  description: {
    type: String,
  },
  images: [{
    type: String,
  }],
  rates: [rateSchema],
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  visibility: {
    type: Boolean,
    default: true
  },
  checked: {
    type: Boolean,
    default: false
  }
});
//export model
const Item = mongoose.model("Item", itemSchema);
// export schema and model
module.exports = { itemSchema, Item };
