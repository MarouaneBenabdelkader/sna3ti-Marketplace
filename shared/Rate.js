const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const rateSchema = new mongoose.Schema({
  reactor_ID: {
    type: ObjectId,
    ref: "User",
  },
  rate: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

// model
const Rate = mongoose.model("Rate", rateSchema);
//export schema and model
module.exports = { rateSchema, Rate };
