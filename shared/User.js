const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const mongodbErrorHandler = require("mongoose-mongodb-errors");



const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "enter a valid name"],
    },
    email: {
        type: String,
        unique: true,    
        required: [true, "enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    profileImage: {
        type: String,
        default: "/static/images/profile-image.jpg",
    },
    resetToken: {
        type: String,
    },
});


userSchema.methods.isValidPassword = function (password) {
    const user = this;
    return bcrypt.compareSync(password, user.password);

};
userSchema.plugin(mongodbErrorHandler);

const User = mongoose.model('User', userSchema);
module.exports = {
    User,
    userSchema,
}