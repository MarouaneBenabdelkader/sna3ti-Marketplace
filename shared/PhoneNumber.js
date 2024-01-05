const mongoose = require("mongoose");

const phoneNumberSchema = new mongoose.Schema({
    number: {
        type: String,
        // TODO: add validation for phone number :
        unique: [true, "phone number already exists"],
    },
    isVerified: {
        type: Boolean,
        // TODO: switch to false after testing :
        default: true,
    },
    verificationCode: {
        type: String,
    }
})
const PhoneNumber = mongoose.model('PhoneNumber', phoneNumberSchema);
module.exports = {
    phoneNumberSchema,
    PhoneNumber
}