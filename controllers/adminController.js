const { Admin } = require("../models/Admin");
const { Handicraft } = require('../models/Handicraft')
const { Customer } = require('../models/Customer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { transporter } = require('../middlewares/emailTransporter')

exports.addAdmin = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingAdmin = await Admin.exists({ email });

    if (existingAdmin) {
      return res.status(409).json({
        message: 'Admin already exists',
        status: 409,
        error: 'Conflict',
      });
    }

    const newAdmin = await Admin.create({
      fullName,
      email,
      password: bcrypt.hashSync(password, 10)
    });

    return res.status(201).json({
      message: 'Admin successfully created',
      admin: newAdmin,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

exports.deleteHandicraft = async (req, res) => {
  try {
    const handicraftId = req.params.handicraft;

    const handicraft = await Handicraft.findById(handicraftId);

    if (!handicraft) {
      return res.status(404).json({
        message: 'Handicraft not found',
        status: 404
      });
    }

    await Handicraft.deleteOne({ _id: handicraftId });

    res.status(200).json({
      message: 'Demand has been rejected successfully',
      status: 200,
    });

    //q send an email to the customer
    const mailOptions = {
      from: process.env.EMAIL,
      to: handicraft.email,
      subject: 'Demand rejected',
      text: `Dear ${handicraft.fullName}, your demand has been rejected by the admin.`,
    };
    try {
      const response = await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log({
        status: 500,
        error: "an error accured during sending the email",
        message: error.message,
      });
    }

  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong ! please try again later',
      error: error.message,
      status: 500,
    });
  }
};

exports.acceptHandicraft = async (req, res) => {
  try {
    const handicraftId = req.params.handicraft;

    const response = await Handicraft.updateOne(
      { _id: handicraftId },
      { $set: { checked: true } },
    );

    if (!response.matchedCount) {
      return res.status(404).json({ message: 'Handicraft not found' });
    }

    if (!response.modifiedCount && response.matchedCount) {
      return res.status(400).json({ message: 'already checked' });
    }

    res.status(200).json({
      message: 'Handicraft demand accepted',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong ! please try again later',
      error: error.message,
    });
  }
};

exports.getHandicrafts = async (req, res) => {
  let queryObject = {};
  let sortObject = {};


  if (req.query.checked !== undefined) {
    queryObject['checked'] = req.query.checked;
  }
  else {
    queryObject['checked'] = true;
  }
  // exclude items from handicrafts unless specified in the query
  let selectObject = '-items -password -__t';

  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let skip = req.query.page ? (parseInt(req.query.page) - 1) * limit : 0;

  if (req.query.sort) {
    sortObject[req.query.sort] = 1;
  }
  if (req.query.fullName) {
    // select * from handicrafts where their full name starts with req.query.fullName
    queryObject['fullName'] = { $regex: '^' + req.query.fullName, $options: 'i' };
  }


  try {
    const handicrafts = await Handicraft.find(queryObject)
      .select(selectObject)
      .sort(sortObject)
      .skip(skip)
      .limit(limit).lean();
    if (handicrafts.length === 0 && req.params.handicraftId) {
      return res.status(404).send({
        status: 404,
        error: "Not found",
        message: "No handicrafts found",
      });
    }

    if (handicrafts.length !== 0 && req.query.includeItems !== undefined && req.query.includeItems == 'true') {
      for (let i = 0; i < handicrafts.length; i++) {
        handicrafts[i].items = handicrafts[i].items?.filter(item => item.checked === true);
      }
    }

    return res.status(200).send({
      status: 200,
      message: "Handicrafts fetched successfully",
      data: handicrafts
    });
  }
  catch (error) {
    return res.status(500).send({
      status: 500,
      error: "Server failed",
      message: "Error fetching handicrafts: " + error.message,
    });
  }
}

exports.deleteItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    let result = await Handicraft.updateOne(
      { 'items._id': itemId },
      { $pull: { items: { _id: itemId } } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'Item not found',
        status: 404,
      });
    }

    // Remove the item from savedItems array of all customers
    result = await Customer.updateMany(
      { savedItems: itemId },
      { $pull: { savedItems: itemId } }
    );

    res.status(200).json({
      message: 'Item deleted successfully',
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};


exports.acceptItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    const result = await Handicraft.updateOne(
      { 'items._id': itemId },
      { $set: { 'items.$.checked': true } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'Item not found',
        status: 404,
      });
    }
    if (result.matchedCount && !result.modifiedCount) {
      return res.status(400).json({
        message: 'Item already checked',
        status: 400,
      });
    }

    res.status(200).json({
      message: 'Item accepted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};
exports.getItems = async (req, res) => {
  let handicraftQueryObject = {};
  let itemsQueryObject = {};

  handicraftQueryObject['checked'] = true;
  itemsQueryObject['checked'] = true;

  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let skip = req.query.page ? (parseInt(req.query.page) - 1) * limit : 0;

  if (req.query.itemStatus !== undefined) {
    itemsQueryObject['checked'] = req.query.itemStatus === 'true' ? true : false;
    console.log(itemsQueryObject['checked'])
  }

  if (req.query.handicraftStatus !== undefined) {
    itemsQueryObject['checked'] = req.query.handicraftStatus;
  }

  try {
    const handicrafts = await Handicraft.find(handicraftQueryObject)
      .select('items -_id -__t')
      .populate({
        path: 'items.owner',
        select: 'fullName email profileImage',
      })
      .lean(); // Using lean() to return plain JavaScript objects instead of Mongoose documents

    const items = handicrafts.flatMap(handicraft => {
      return itemsQueryObject['checked'] == true ? handicraft.items.filter(item => item.checked) : handicraft.items.filter(item => !item.checked)
    });

    return res.status(200).send({
      status: 200,
      message: "items of checked handicrafts fetched successfully",
      data: items,
      numberOfItems: handicrafts.flatMap(handicraft => handicraft.items).length
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      error: "Server failed",
      message: "Error fetching items: " + error.message,
    });
  }
}


exports.deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.customerId;

    const customer = await Customer.findByIdAndDelete(customerId);

    if (!customer) {
      return res.status(404).json({
        message: 'Customer not found',
        status: 404,
      });
    }

    res.status(200).json({
      message: 'Customer deleted successfully',
      deletedCustomer: customer,
    });
    //q send an email to the customer
    const mailOptions = {
      from: process.env.EMAIL,
      to: customer.email,
      subject: 'Account Deleted',
      text: `Your account has been deleted by the admins because it violates our terms and conditions.`,
    };
    try {
      const response = await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log({
        status: 500,
        error: "an error accured during sending the email",
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the User with the given email
    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
        status: 400,
        error: "Invalid email or password",
      });
    }

    // Check if the provided password is correct
    if (!user.isValidPassword(password)) {
      return res.status(400).json({
        message: "Invalid email or password",
        status: 400,
        error: "Invalid email or password",
      });
    }
    //q jwt options
    if (req.body.rememberMe) {
      var jwtOptions = {
        expiresIn: "30d",
      };
    } else {
      var jwtOptions = {
        expiresIn: "3d",
      };
    }
    // Create a JWT token for the authenticated User
    const token = jwt.sign(
      {
        user: {
          id: user._id,
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          profileImage: user.profileImage,
          role: 'admin',
          __t: 'admin',
        },
      },
      process.env.jwtSecret,
      jwtOptions
    );

    // add cookie AS JWT
    res.cookie("jwt", token, { httpOnly: true, expiresIn: "3d" });

    // Send the token and User data to the client
    res.status(200).json({
      message: "Authentication successful",
      token,
      user: {
        id: user._id,
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImage: user.profileImage,
        role: 'admin',
        __t: 'admin',
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred during signing",
        error: error,
        status: 500,
      });
  }
};
exports.getCustomers = async (req, res) => {
  let queryObject = {};
  let selectString = '-password -ratedHandicrafts -savedItems -following -ratedItems -__v';

  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let skip = req.query.page ? (parseInt(req.query.page) - 1) * limit : 0;

  if (req.query.search) {
    queryObject['fullName'] = { $regex: req.query.search, $options: 'i' };
  }

  if (req.params.customerId) {
    queryObject['_id'] = req.params.customerId;
  }

  try {
    const customers = await Customer.find(queryObject)
      .select(selectString)
      .limit(limit)
      .skip(skip)
      .lean(); // Using lean() to return plain JavaScript objects instead of Mongoose documents

    const totalCustomers = await Customer.countDocuments(queryObject);

    res.status(200).json({
      message: 'Customers fetched successfully',
      data: customers,
      totalCustomers,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
}
