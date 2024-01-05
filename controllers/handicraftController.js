const { PhoneNumber } = require("../shared/PhoneNumber");
const { Handicraft } = require("../models/Handicraft");
const { Item } = require("../shared/Item");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const {
      fullName,
      profileImageUrl,
      email,
      password,
      phoneNumber,
      address,
      craft,
    } = req.body;

    let flagg = await Handicraft.exists({ "phoneNumber.number": phoneNumber });

    if (flagg) {
      return res.status(409).send({
        status: 409,
        error: "conflict",
        message: "Handicraft with this phone number already exists",
        data: { fullName, email, password, phoneNumber, address, craft },
      });
    }

    flagg = await Handicraft.exists({ email });

    if (flagg) {
      return res.status(409).send({
        status: 409,
        error: "conflict",
        message: "Handicraft with this email already exists",
        data: { fullName, email, password, phoneNumber, address, craft },
      });
    }
    // const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const phoneNumberDocument = new PhoneNumber({
      number: phoneNumber,
      // verificationCode,
    });

    var handicraftDocument;

    try {
      handicraftDocument = new Handicraft({
        fullName,
        email,
        phoneNumber: phoneNumberDocument,
        password: bcrypt.hashSync(password, 10),
        address,
        profileImage: profileImageUrl,
        craft,
      });
      // await phoneNumberDocument.save();
      // Create a new handicraft

      await handicraftDocument.save();

      try {
        // TODO: Send verification code to handicraft
        // await sendSms(handicraftDocument.phoneNumber.number, `Your verification code is: ${verificationCode}`);
        return res.status(201).send({
          status: 201,
          message: "Registration successful, please verify your phone number.",
          // TODO: Remove this in production
          handicraft: handicraftDocument,
          data: { phoneNumber },
        });
      } catch (error) {
        await handicraftDocument.delete();
        return res.status(500).send({
          status: 500,
          error: "server failed",
          message: "Error sending verification code: " + error.message,
          data: { fullName, email, password, phoneNumber, address, craft },
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: "server failed",
        message: "Error registering handicraft: " + error.message,
        data: { fullName, email, password, phoneNumber, address, craft },
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      error: "server failed",
      message: "Error registering handicraft: " + error.message,
    });
  }
};
exports.getMyProfile = async (req, res) => {
  try {
    const handicraft = await Handicraft.findById(req.user.id)
      .select("-password -__v ")
      .lean();
    if (!handicraft) {
      return res.status(404).send({
        status: 404,
        error: "not found",
        message: "Handicraft not found",
      });
    }
    return res.status(200).send({
      status: 200,
      message: "Handicraft found",
      data: handicraft,
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      error: "server failed",
      message: "Error getting handicraft: " + error.message,
    });
  }
};

exports.getItems = async (req, res) => {
  let queryObject = {};
  let sortObject = {};
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let skip = req.query.page ? (parseInt(req.query.page) - 1) * limit : 0;

  queryObject["items.checked"] = true;
  queryObject["checked"] = true;

  if (req.params.handicraftId) {
    queryObject._id = req.params.handicraftId;
  }

  if (req.params.itemId) {
    queryObject["items._id"] = req.params.itemId;
  }

  if (
    req.query.checkedHandicraft !== undefined &&
    req.user &&
    req.user.role === "admin"
  ) {
    queryObject["checked"] = req.query.checkedHandicraft;
  }
  if (
    req.query.checkedItems !== undefined &&
    req.user &&
    req.user?.role === "admin"
  ) {
    queryObject["items.checked"] = req.query.checkedItems;
  }

  if (req.query.sort) {
    sortObject["items." + req.query.sort] = 1;
  }

  if (req.query.minPrice && req.query.maxPrice) {
    queryObject["items.price"] = {
      $gte: req.query.minPrice,
      $lte: req.query.maxPrice,
    };
  } else if (req.query.minPrice) {
    queryObject["items.price"] = { $gte: req.query.minPrice };
  } else if (req.query.maxPrice) {
    queryObject["items.price"] = { $lte: req.query.maxPrice };
  }

  try {
    const handicrafts = await Handicraft.find(queryObject)
      .select("items -_id -__t")
      .sort(sortObject)
      .skip(skip)
      .limit(limit);

    const items = handicrafts.flatMap((handicraft) => handicraft.items);

    return res.status(200).send({
      status: 200,
      message: "Items fetched successfully",
      data: items,
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      error: "Server failed",
      message: "Error fetching handicrafts: " + error.message,
    });
  }
};

exports.addItem = async (req, res) => {
  try {
    const item = new Item({
      owner: req.user.id,
      itemName: req.body.itemName,
      price: req.body.price,
      description: req.body.description ? req.body.description : "",
      images: req.body.images,
    });
    try {
      await Handicraft.findOneAndUpdate(
        { _id: req.user.id },
        { $push: { items: item } }
      );
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Something went wrong",
        error: error.message,
      });
    }
    return res.status(201).json({
      status: 201,
      message: "item created successfully",
      data: item,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const handicraftdb = await Handicraft.findOne({
      _id: req.user.id,
      "items._id": req.params.itemId,
    });

    if (!handicraftdb)
      return res.status(404).json({ status: 404, message: "Item not found" });

    const itemIndex = handicraftdb.items.findIndex(
      (item) => item._id.toString() === req.params.itemId
    );

    // if (itemIndex === -1) {
    //   return res.status(404).json({ status: 404, message: "Item not found" });
    // }

    // Update item properties with values from req.body
    for (const [key, value] of Object.entries(req.body)) {
      if (key === "images") {
        continue;
      } else handicraftdb.items[itemIndex][key] = value;
    }

    // Update images and delete from the server the old ones
    if (req.body.images.length > 0) {
      const oldImages = handicraftdb.items[itemIndex].images;
      deleteFiles(oldImages);
      handicraftdb.items[itemIndex]["images"] = req.body.images;
    }
    if (
      (req.body.description &&
        req.body.description !== handicraftdb.items[itemIndex].description) ||
      (req.body.itemName &&
        req.body.itemName !== handicraftdb.items[itemIndex].itemName) ||
      req.body.images.length > 0
    )
      handicraftdb.items[itemIndex]["checked"] = false;

    await handicraftdb.save();
    res.status(200).json({
      status: 200,
      message: "Item updated successfully",
      data: handicraftdb.items[itemIndex],
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    // Delete the item from the handicraft's items array
    const updateResult = await Handicraft.updateOne(
      { _id: req.user.id },
      { $pull: { items: { _id: req.params.itemId } } }
    );

    if (!updateResult.modifiedCount) {
      return res.status(404).json({
        status: 404,
        message: "Item not found",
      });
    }

    if (updateResult.modifiedCount) {
      return res.status(200).json({
        status: 200,
        message: "Item deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Somthing went wrong",
      error: error.message,
    });
  }
};
const fs = require("fs");
const path = require("path");

function deleteFiles(filePaths) {
  const publicFolderPath = "./public"; // Specify the path to the "public" folder

  filePaths.forEach((filePath) => {
    const absolutePath = path.join(publicFolderPath, filePath);

    fs.unlink(absolutePath, (error) => {
      if (error) {
        console.error(`Failed to delete file '${absolutePath}': ${error}`);
      } else {
        console.log(`File '${absolutePath}' has been deleted successfully.`);
      }
    });
  });
}
