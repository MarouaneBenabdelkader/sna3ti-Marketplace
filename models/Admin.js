const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
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
  role: {
    type: String,
    default: "admin",
  },
});

adminSchema.methods.isValidPassword = function (password) {
  const user = this;
  const compare = bcrypt.compareSync(password, user.password);
  return compare;
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = {
  Admin,
  adminSchema,
};
