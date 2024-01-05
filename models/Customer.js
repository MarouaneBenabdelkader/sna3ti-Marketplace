const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const { userSchema, User } = require("../shared/User");
const { phoneNumberSchema } = require("../shared/PhoneNumber");
const { itemSchema } = require("../shared/Item");

/* **************************************************** schemas **************************************************** */

const customerSchema = new mongoose.Schema({
    ...userSchema.obj,
    phoneNumber: {
        type: phoneNumberSchema,
    },
    savedItems: [{
        type: ObjectId,
        ref: 'Item'
    }],
    ratedItems: [{
        itemId: ObjectId,
        rate: Number,
    }],
    ratedHandicrafts: [{
        handicraftId: {
            type: ObjectId,
            ref: 'Handicraft'
        },
        rate: Number,
    }],
    following: [{
        type: ObjectId,
        ref: 'Handicraft'
    }],
    emailVerificationToken: {
        type: String
    },
    emailVerified: {
        type: Boolean,
        default: false
    }

});

const Customer = User.discriminator('Customer', customerSchema);
//TODO: hash the password before saving the user to the database

module.exports = {
    Customer,
}