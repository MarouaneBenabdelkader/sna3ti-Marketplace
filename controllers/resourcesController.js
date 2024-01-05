const { Handicraft } = require("../models/Handicraft");
const { Item } = require("../shared/Item");
const EXPIRATION_TIME = 60;

exports.getHandicrafts = async (req, res) => {
  let queryObject = {};
  let sortObject = {};
  const cacheKey = `handicrafts_${req.path}_${JSON.stringify(req.query)}`;
  try {
    // Check if data is in Redis cache
    const cachedData = await req.redisClient.get(cacheKey);
    if (cachedData) {
      return res.status(200).json({
        status: 200,
        message: "Handicrafts fetched from cache",
        data: JSON.parse(cachedData),
      });
    }
    queryObject["checked"] = true;
    // exclude items from handicrafts unless specified in the query
    let selectObject = "-items -password -__t";

    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let skip = req.query.page ? (parseInt(req.query.page) - 1) * limit : 0;

    if (req.params.handicraftId) {
      queryObject._id = req.params.handicraftId;
      // selectObject = '-password -__t';
    }

    if (
      req.query.includeItems !== undefined &&
      req.query.includeItems == "true"
    ) {
      selectObject = "-password -__t";
    }

    if (req.query.sort) {
      sortObject[req.query.sort] = 1;
    }
    if (req.query.fullName) {
      // select * from handicrafts where their full name starts with req.query.fullName
      queryObject["fullName"] = {
        $regex: "^" + req.query.fullName,
        $options: "i",
      };
    }

    const handicrafts = await Handicraft.find(queryObject)
      .select(selectObject)
      .sort(sortObject)
      .skip(skip)
      .limit(limit)
      .lean();
    if (handicrafts.length === 0 && req.params.handicraftId) {
      return res.status(404).send({
        status: 404,
        error: "Not found",
        message: "No handicrafts found",
      });
    }

    if (
      handicrafts.length !== 0 &&
      req.query.includeItems !== undefined &&
      req.query.includeItems == "true"
    ) {
      for (let i = 0; i < handicrafts.length; i++) {
        handicrafts[i].items = handicrafts[i].items?.filter(
          (item) => item.checked === true
        );
      }
    }
    await req.redisClient.set(cacheKey, JSON.stringify(handicrafts), {
      EX: EXPIRATION_TIME, // Sets expiration (e.g., 1 hour)
    });
    return res.status(200).send({
      status: 200,
      message: "Handicrafts fetched successfully",
      data: handicrafts,
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      error: "Server failed",
      message: "Error fetching handicrafts: " + error.message,
    });
  }
};

exports.getItems = async (req, res) => {
  // Set cache key
  const cacheKey = `items_${req.path}_${JSON.stringify(req.query)}`;
  // Check if data is in Redis cache
  const cachedData = await req.redisClient.get(cacheKey);
  if (cachedData) {
    return res.status(200).json({
      status: 200,
      message: "Items fetched from cache",
      data: JSON.parse(cachedData),
    });
  }
  // Initialize query objects and sort object
  let queryObject = {};
  let ItemQueryObject = {};
  let sortObject = {};
  let populateObject = {};
  // Set limit for the number of items to fetch, default is 10
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  // Set the number of items to skip, default is 0
  let skip = req.query.page ? (parseInt(req.query.page) - 1) * limit : 0;
  // Set query parameters for items
  ItemQueryObject["items.checked"] = true;
  ItemQueryObject["items.visibility"] = true;
  // Set sort order for items
  sortObject["items.createdAt"] = -1;
  // Set query parameter for checked item
  queryObject["checked"] = true;
  // If populateHandicraft is true, populate the owner of the item
  if (
    req.query.populateHandicraft !== undefined &&
    req.query.populateHandicraft == "true"
  ) {
    populateObject["path"] = "items.owner";
    populateObject["select"] = "profileImage fullName _id phoneNumber";
  }
  // If the request query has a handicraftId parameter
  if (req.params.handicraftId) {
    // Set the handicraftId query parameter
    queryObject._id = req.params.handicraftId;
  }
  // If the request query has a itemId parameter
  if (req.params.itemId) {
    // Set the itemId query parameter

    ItemQueryObject["items._id"] = req.params.itemId;
  }
  // If the request query has a checkedHandicraft parameter and the user is an admin

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
    // Set the query parameter for checked items

    ItemQueryObject["items.checked"] = req.query.checkedItems;
  }
  // If the request query has a sort parameter

  if (req.query.sort) {
    // Set the sort order for items

    ItemQueryObject["items." + req.query.sort] = 1;
  }
  // If the request query has minPrice and maxPrice parameters

  if (req.query.minPrice && req.query.maxPrice) {
    ItemQueryObject["items.price"] = {
      $gte: req.query.minPrice,
      $lte: req.query.maxPrice,
    };
  } else if (req.query.minPrice) {
    // If only minPrice is provided, set the minimum price for items
    ItemQueryObject["items.price"] = { $gte: req.query.minPrice };
  } else if (req.query.maxPrice) {
    // If only maxPrice is provided, set the maximum price for items
    ItemQueryObject["items.price"] = { $lte: req.query.maxPrice };
  }

  try {
    // const handicrafts = await Handicraft.find(queryObject)
    //     .select('items -_id -__t')
    //     .sort(sortObject)
    //     .skip(skip)
    //     .limit(limit)
    //     .populate(populateObject.path, populateObject.select).lean();
    // Execute the MongoDB aggregate query
    const handicrafts = await Handicraft.aggregate([
      {
        $match: queryObject,
      },
      {
        $unwind: {
          path: "$items",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: ItemQueryObject,
      },
      {
        $sort: sortObject,
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "users",
          localField: "items.owner",
          foreignField: "_id",
          as: "items.owner",
        },
      },
      {
        $unwind: {
          path: "$items.owner",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        // includ only the fields we need from the owners

        $project: {
          _id: 0,
          "items._id": 1,
          "items.itemName": 1,
          "items.price": 1,
          "items.description": 1,
          "items.images": 1,
          "items.createdAt": 1,
          "items.rates": 1,
          "items.owner._id": 1,
          "items.owner.fullName": 1,
          "items.owner.profileImage": 1,
        },
      },
    ]);
    // Flatten the array of handicrafts to get an array of items

    const items = handicrafts.flatMap((handicraft) => handicraft.items);
    // Cache the items in Redis with a key of cacheKey and an expiration time of 1 hour
    await req.redisClient.set(cacheKey, JSON.stringify(items), {
      EX: EXPIRATION_TIME, // Sets expiration time
    });
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
exports.getTopRatedHandicrafts = async (req, res) => {
  try {
    cacedkey = `topRatedHandicrafts_${req.path}_${JSON.stringify(req.query)}`;
    cachedData = await req.redisClient.get(cacedkey);
    if (cachedData) {
      return res.status(200).json({
        status: 200,
        message: "Top rated handicrafts fetched from cache",
        data: JSON.parse(cachedData),
      });
    }
    const topRatedHandicrafts = await Handicraft.aggregate([
      {
        $match: {
          checked: true,
        },
      },
      {
        $unwind: {
          path: "$rates",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          allReviewers: { $addToSet: "$rates.reactor_ID" },
          avgRating: { $avg: "$rates.rate" },
          profileImage: { $first: "$profileImage" },
          fullName: { $first: "$fullName" },
          craft: { $first: "$craft" },
        },
      },
      {
        $project: {
          _id: 1,
          numberOfReviewers: { $size: "$allReviewers" },
          avgRating: 1,
          profileImage: 1,
          fullName: 1,
          craft: 1,
        },
      },
      { $sort: { avgRating: -1 } },
      { $limit: 3 },
    ]);
    await req.redisClient.set(cacedkey, JSON.stringify(topRatedHandicrafts), {
      EX: EXPIRATION_TIME,
    });
    return res.status(200).json({
      status: 200,
      message: "Top rated handicrafts fetched successfully",
      data: topRatedHandicrafts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getTopRatedItems = async (req, res) => {
  try {
    // Set cache key
    cachedkey = `topRatedItems_${req.path}_${JSON.stringify(req.query)}`;
    // Check if data is in Redis cache
    cachedData = await req.redisClient.get(cachedkey);
    // If data is in cache, return it
    if (cachedData) {
      return res.status(200).json({
        status: 200,
        message: "Top rated items fetched from cache",
        data: JSON.parse(cachedData),
      });
    }
    const topRatedItems = await Handicraft.aggregate([
      {
        $match: {
          checked: true,
        },
      },
      {
        $unwind: {
          path: "$items",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          checked: true,
          "items.checked": true,
          "items.visibility": true,
        },
      },
      {
        $unwind: {
          path: "$items.rates",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$items._id",
          itemName: { $first: "$items.itemName" },
          images: { $first: "$items.images" },
          price: { $first: "$items.price" },
          numberOfReviewers: { $sum: 1 },
          avgRating: { $avg: "$items.rates.rate" },
        },
      },
      { $sort: { avgRating: -1 } },
      { $limit: 3 },
    ]);
    // Cache the items in Redis with a key of cacheKey and an expiration time of 1 hour
    await req.redisClient.set(cachedkey, JSON.stringify(topRatedItems), {
      EX: EXPIRATION_TIME, // Sets expiration time
    });
    return res.status(200).json({
      status: 200,
      message: "Top rated items fetched successfully",
      data: topRatedItems,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
