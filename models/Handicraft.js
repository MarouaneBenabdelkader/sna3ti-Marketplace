const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const { userSchema, User } = require("../shared/User");
const { itemSchema } = require("../shared/Item");
const { rateSchema } = require("../shared/Rate");
const { phoneNumberSchema } = require("../shared/PhoneNumber");

/* **************************************************** schemas **************************************************** */


const handicraftSchema = new mongoose.Schema({
  ...userSchema.obj,
  phoneNumber: {
    type: phoneNumberSchema,
    required: true
  },
  items: [itemSchema],
  rates: [rateSchema],
  address: {
    type: String
  },
  checked: {
    type: Boolean,
    default: false
  },
  craft: {
    type: String,
    required: true
  }
});

const Handicraft = User.discriminator('Handicraft', handicraftSchema);
const Item = mongoose.model('Item', itemSchema);
const Rate = mongoose.model('Rate', rateSchema);

module.exports = {
  rateSchema,
  itemSchema,
  handicraftSchema,
  Handicraft,
  Item,
  Rate
}