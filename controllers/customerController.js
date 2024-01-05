const { Customer } = require('../models/Customer');
const { Handicraft, Rate } = require('../models/Handicraft');
const { PhoneNumber } = require('../shared/PhoneNumber');
const { transporter } = require('../middlewares/emailTransporter')
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const crypto = require('crypto')

exports.signup = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber } = req.body;

    let flagg = await Customer.exists({ 'phoneNumber.number': phoneNumber });

    if (flagg) {
      return res.status(409).send({
        status: 409,
        error: "conflict",
        message: "Customer with this phone number already exists",
        data: { fullName, email, password, phoneNumber }
      });

    }

    flagg = await Customer.exists({ email });

    if (flagg) {
      return res.status(409).send({
        status: 409,
        error: "conflict",
        message: "Customer with this email already exists",
        data: { fullName, email, password, phoneNumber }
      });

    }
    var profileImage = req.body.profileImageUrl
      ? req.body.profileImageUrl
      : "/images/profile-image.jpg";

    // const verificationCode = Math.floor(100000 + Math.random() * 900000);

    const phoneNumber02 = new PhoneNumber({
      number: phoneNumber,
      // verificationCode,
    });

    var newCustomer;
    try {
      newCustomer = new Customer({
        fullName,
        email,
        phoneNumber: phoneNumber02,
        password: bcrypt.hashSync(password, 10),
        profileImage,
      });

      // await phoneNumber02.save();
      // Create a new handicraft
      // await newCustomer.save();

      const verificationToken = crypto.randomBytes(32).toString('hex');

      newCustomer.emailVerificationToken = verificationToken;


      const verificationUrl = `${process.env.DOMAINNAME}/verify-email/${verificationToken}`;

      const mailOptions = {
        from: process.env.EMAIL,
        to: newCustomer.email,
        subject: 'Email Verification',
        text: `Please verify your email by clicking on the following link: ${verificationUrl}`,
        html: `<p>Please verify your email by clicking on the following link: <a href="${verificationUrl}">${verificationUrl}</a></p>`,
      };

      await newCustomer.save();

      try {
        await transporter.sendMail(mailOptions);
      } catch (error) {
        await newCustomer.delete();
        return res.status(500).send({
          status: 500,
          error: "an error accured during registration",
          message: "Error : " + error.message + 'try again please',
        });
      }

      return res
        .status(201)
        .send({
          message: "Registration successful. please verify your email ",
          data: newCustomer,
        });

    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: "Bad request",
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: 500,
      error: "server failed",
      message: "Error registering customer: " + error.message,
    });
  }
}
exports.getProfile = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.user.id })
      .lean();
    if (!customer) {
      return res.status(404).json({ status: 404, message: "Customer not found" });
    }
    return res.status(200).json({ status: 200, message: "Customer found", data: customer });

  }
  catch (error) {
    return res.status(500).json({ status: 500, error: "Internal server error", message: error.message });
  }
}
exports.delete = async (req, res) => {

}

exports.followHandicraft = async (req, res) => {
  try {
    const handicraftId = req.params.handicraftId;
    const customer = await Customer.findOne({ _id: req.user.id });
    const handicraft = await Handicraft.exists({ _id: handicraftId });

    if (!handicraft) {
      return res.status(404).json({ status: 404, message: "Handicraft not found" });
    }

    if (!customer) {
      return res.status(404).json({ status: 404, message: "Customer not found" });
    }
    /* console.log(customer.following)
    if (customer.following.includes(handicraftId)) {
      return res.status(400).json({ status: 400, message: "Already following this handicraft" });
    }

    customer.following.push(handicraftId);
    await customer.save(); */
    const response = await Customer.updateOne(
      { _id: req.user.id },
      { $addToSet: { following: handicraftId } }
    );
    if (response.modifiedCount === 0) {
      return res.status(400).json({ status: 400, message: "you are already following this handicraft" });
    }


    res.status(200).json({
      status: 200,
      message: "Successfully followed the handicraft",
      data: handicraftId
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

exports.unfollowHandicraft = async (req, res) => {
  try {
    const handicraftId = req.params.handicraftId;
    const customer = await Customer.findOne({ _id: req.user.id });
    const handicraft = await Handicraft.findOne({ _id: handicraftId });

    if (!handicraft) {
      return res.status(404).json({ status: 404, message: "Handicraft not found" });
    }

    if (!customer) {
      return res.status(404).json({ status: 404, message: "Customer not found" });
    }

    /* if (!customer.following.includes(handicraftId)) {
      return res.status(400).json({ status: 400, message: "Not following this handicraft" });
    }

    customer.following = customer.following.filter(id => id !== handicraftId);
    await customer.save(); */
    const response = await Customer.updateOne(
      { _id: req.user.id },
      { $pull: { following: handicraftId } }
    );
    if (response.modifiedCount === 0) {
      return res.status(400).json({ status: 400, message: "you are not following this handicraft to unfollow him" });
    }

    res.status(200).json({
      status: 200,
      message: "Successfully unfollowed the handicraft",
      data: handicraftId
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

exports.rateHandicraft = async (req, res) => {
  try {
    const handicraftId = req.params.handicraftId;
    const rating = req.body.rating;
    const customerId = req.user.id;

    let handicraft = await Handicraft.exists({ _id: handicraftId });

    if (!handicraft) {
      return res.status(404).json({ status: 404, message: "Handicraft not found" });
    }

    handicraft = await Handicraft.exists(
      { _id: handicraftId, "rates.reactor_ID": customerId },
    );

    // check if the handicraft has already been rated by the customer
    if (handicraft) {
      await Handicraft.updateOne(
        { _id: handicraftId, "rates.reactor_ID": customerId },
        { $set: { "rates.$.rate": rating } }
      );
    } else {
      await Handicraft.updateOne(
        { _id: handicraftId },
        { $push: { rates: { reactor_ID: customerId, rate: rating } } }
      );
    }


    // Check if customer has already rated the handicraft
    const customer = await Customer.exists({ _id: customerId, 'ratedHandicrafts.handicraftId': handicraftId });

    let response2;
    if (customer) {
      // If the customer already rated the handicraft, update the rating
      response2 = await Customer.updateOne(
        { _id: customerId, 'ratedHandicrafts.handicraftId': handicraftId },
        { $set: { 'ratedHandicrafts.$.rate': rating } }
      );
    } else {
      // If the customer has not yet rated the handicraft, add a new rating
      response2 = await Customer.updateOne(
        { _id: customerId },
        { $push: { ratedHandicrafts: { handicraftId: handicraftId, rate: rating } } }
      );
    }

    res.status(200).json({
      status: 200,
      message: "Successfully rated the handicraft",
      data: { handicraftId, rate: rating }
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};


exports.unsaveItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const customerId = req.user.id; // Assuming the customer's ID is stored in req.user.id

    const flag = await Handicraft.exists({ 'items._id': itemId });

    if (!flag) {
      return res.status(404).json({ status: 404, message: "Item not found" });
    }

    const result = await Customer.updateOne(
      { _id: customerId },
      { $pull: { savedItems: itemId } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({
        status: 400,
        message: "Item not found in saved items",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Item removed from saved items successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

exports.unRateHandicraft = async (req, res) => {
  try {
    const handicraftId = req.params.handicraftId;
    const customerId = req.user.id; // Assuming the customer's ID is stored in req.user.id

    const handicraft = await Handicraft.findById(handicraftId);
    const customer = await Customer.findById(customerId);

    if (!handicraft) {
      return res.status(404).json({ status: 404, message: "Handicraft not found" });
    }
    if (!customer) {
      return res.status(404).json({ status: 404, message: "Customer not found" });
    }

    const customerRatingIndex = handicraft.rates.findIndex((rating) => rating.reactor_ID.toString() === customerId);

    if (customerRatingIndex === -1) {
      return res.status(400).json({
        status: 400,
        message: "rate not found",
      });
    }

    // Remove the rating
    handicraft.rates.splice(customerRatingIndex, 1);
    await handicraft.save();

    res.status(200).json({
      status: 200,
      message: "rate removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};


exports.saveItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const customerId = req.user.id; // Assuming the customer's ID is stored in req.user.id

    const flag = await Handicraft.exists({ 'items._id': itemId });

    if (!flag) {
      return res.status(404).json({ status: 404, message: "Item not found" });
    }

    const result = await Customer.updateOne(
      { _id: customerId },
      { $addToSet: { savedItems: itemId } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({
        status: 400,
        message: "Item already saved",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Item saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

/* exports.rateHandicraft = async (req, res) => {
  try {
    const handicraftId = req.params.handicraftId;
    const rating = req.body.rating;
    const customerId = req.user.id;

    const handicraft = await Handicraft.findOne({ _id: handicraftId });
    const customer = await Customer.findById(customerId);

    if (!handicraft) {
      return res.status(404).json({ status: 404, message: "Handicraft not found" });
    }
    if (!customer) {
      return res.status(404).json({ status: 404, message: "Customer not found" });
    }

    // Check if the customer has already rated the handicraft
    const existingRatingIndex = handicraft.rates.findIndex(rate => rate.reactor_ID.toString() === customerId.toString());

    if (existingRatingIndex !== -1) {
      // Update the existing rating
      handicraft.rates[existingRatingIndex].rate = rating;
      handicraft.rates[existingRatingIndex].date = Date.now();
    } else {
      // Add a new rating
      const newRating = new Rate({
        reactor_ID: customerId,
        rate: rating,
        date: Date.now(),
      });

      handicraft.rates.push(newRating);
    }

    await handicraft.save();

    // Include updated handicraft data if needed
    res.status(200).json({
      status: 200,
      message: "Successfully rated the handicraft",
      data: handicraft.rates
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
}; */


/* exports.unsaveItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const customerId = req.user.id; // Assuming the customer's ID is stored in req.user.id

    const flag = await Handicraft.exists({ 'items._id': itemId });

    if (!flag) {
      return res.status(404).json({ status: 404, message: "Item not found" });
    }

    const result = await Customer.updateOne(
      { _id: customerId },
      { $pull: { savedItems: itemId } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({
        status: 400,
        message: "Item not found in saved items",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Item removed from saved items successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
}; */

exports.unrateItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const customerId = req.user.id; // Assuming the customer's ID is stored in req.user.id

    const updateResult = await Handicraft.updateOne(
      { 'items._id': itemId },
      { $pull: { 'items.$.rates': { reactor_ID: customerId } } }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ status: 404, message: "Rating not found" });
    }

    res.status(200).json({
      status: 200,
      message: "Successfully unrated the item"
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

/* exports.rateItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const customerId = req.user.id; // Assuming the customer's ID is stored in req.user.id
    const rating = req.body.rating;

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).json({ status: 400, message: "Rating must be a number between 1 and 5" });
    }

    var handicraft = await Handicraft.findOne({ 'items._id': itemId });

    if (!handicraft) {
      return res.status(404).json({ status: 404, message: "Item not found" });
    }

    const item = handicraft.items.find(item => item._id.toString() === itemId);
    const existingRating = item.rates.find(rate => rate.reactor_ID.toString() === customerId);

    if (existingRating) {
      // Update existing rating
      handicraft = await Handicraft.findOneAndUpdate(
        { 'items._id': itemId, 'items.rates.reactor_ID': customerId },
        { $set: { 'items.$.rates.$[elem].rate': rating } },
        {
          arrayFilters: [{ 'elem.reactor_ID': customerId }],
          new: true, // Return the updated document
        }
      );

    } else {
      // Add new rating
      const newRating = {
        reactor_ID: customerId,
        rate: rating
      };

      handicraft = await Handicraft.findOneAndUpdate(
        { 'items._id': itemId },
        { $push: { 'items.$.rates': newRating } },
        {
          new: true, // Return the updated document 
        }
      );
    }

    res.status(200).json({
      status: 200,
      message: "Successfully rated the item",
      data: handicraft.items
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
}; */

exports.rateItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const rating = req.body.rating;
    const customerId = req.user.id;

    // Locate the handicraft with the specific item
    let handicraft = await Handicraft.findOne({ 'items._id': itemId });

    if (!handicraft) {
      return res.status(404).json({ status: 404, message: "Item not found" });
    }

    // Find the specific item
    let item = handicraft.items.id(itemId);

    // Check if the item has already been rated by the customer
    let existingRatingIndex = item.rates.findIndex(rate => rate.reactor_ID.toString() === customerId);

    if (existingRatingIndex !== -1) {
      // If the customer has already rated the item, update the rating
      item.rates[existingRatingIndex].rate = rating;
    } else {
      // If the customer has not yet rated the item, add a new rating
      item.rates.push({ reactor_ID: customerId, rate: rating });
    }

    await handicraft.save();

    // Check if customer has already rated the item
    const customer = await Customer.exists({ _id: customerId, 'ratedItems.itemId': itemId });

    if (customer) {
      // If the customer already rated the item, update the rating
      await Customer.updateOne(
        { _id: customerId, 'ratedItems.itemId': itemId },
        { $set: { 'ratedItems.$.rate': rating } }
      );
    } else {
      // If the customer has not yet rated the item, add a new rating
      await Customer.updateOne(
        { _id: customerId },
        { $push: { ratedItems: { itemId: itemId, rate: rating } } }
      );
    }

    res.status(200).json({
      status: 200,
      message: "Successfully rated the item",
      data: { itemId, rate: rating }
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

exports.getMySavedItems = async (req, res) => {

  try {
    let savedItems;
    if (!req.body.itemIds) {
      const dbResponse = await Customer.findById(req.user.id).select('savedItems -_id -__t').lean();
      savedItems = dbResponse.savedItems.map(id => mongoose.Types.ObjectId(id)); // Convert to ObjectIds
    }
    else {
      savedItems = req.body.itemIds.map(id => mongoose.Types.ObjectId(id)); // Convert to ObjectIds
    }

    const items = await Handicraft.aggregate([
      { $match: { checked: true } }, // Only consider checked handicrafts
      { $unwind: "$items" }, // Flatten the items array
      { $match: { "items.checked": true,"items.visibility":true, "items._id": { $in: savedItems } } }, // Match the items
      {
        $addFields: {
          "items.owner": {
            _id: "$_id",
            fullName: "$fullName",
            profileImage: "$profileImage",
          },
        },
      }, // Modify the owner object in each item
      { $replaceRoot: { newRoot: "$items" } }, // Replace the root with the items
    ]);

    res.status(200).json({
      status: 200,
      message: "Successfully retrieved the items",
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
exports.getFollowedHandicraftItems = async (req, res) => {
  try {
    const customerId = req.user.id;

    // Find the customer by their ID and retrieve the followed handicrafts
    const customer = await Customer.findById(customerId).select('following -_id -__t').lean();
    const followedHandicrafts = customer.following;

    // Retrieve the items of the followed handicrafts
    const items = await Handicraft.aggregate([
      { $match: { _id: { $in: followedHandicrafts } } }, // Match the followed handicrafts
      { $unwind: "$items" }, // Flatten the items array
      { $match: { "items.checked": true, "items.visibility": true } }, // Match the checked and visible items
      {
        $addFields: {
          "items.owner": {
            _id: "$_id",
            fullName: "$fullName",
            profileImage: "$profileImage",
          },
        },
      }, // Modify the owner object in each item
      { $replaceRoot: { newRoot: "$items" } }, // Replace the root with the items
    ]);

    res.status(200).json({
      status: 200,
      message: "Successfully retrieved the items",
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
