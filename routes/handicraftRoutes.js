const express = require('express');
const router = express.Router();

const handicraftController = require('../controllers/handicraftController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const uploadProfileImage = require('../middlewares/uploadProfileImage');
const uploadItemImages = require('../middlewares/uploadItemImages');
const validateRegistrationHandicraft = require('../middlewares/validateRegistrationFieldsHandicraft');
const { resizeProfileImage } = require('../middlewares/resizeImages');
const validateProfileImageField = require('../middlewares/validateProfileImageField');
const ensureHandicraft = require('../middlewares/ensureHandicraft');
const { validateItemCreation } = require("../middlewares/validateItemCreation");
const resizeItemImages = require('../middlewares/resizeItemImages');
const validateItemImagesField = require('../middlewares/validateItemImagesField');
const { validateItemModification } = require('../middlewares/validateItemModification');
const validateQuery_Params_Body = require('../middlewares/validateQuery_Params_Body');
const { uploadImagesWithLimit } = require('../middlewares/limitNumberOfUploads');

// Authentication routes
router.post('/signup',
    uploadProfileImage.single("profileImage"),
    validateRegistrationHandicraft,
    validateProfileImageField,
    resizeProfileImage,
    handicraftController.signup
);

router.get("/myProfile", ensureAuthenticated, ensureHandicraft, handicraftController.getMyProfile);
// Items CRUD routes

// a route for fetcing one or all the items of a specific handicraft
// TODO: aggresive testing of this route is required to ensure that it works as expected
router.get("/:handicraftId?/items/:itemId?", validateQuery_Params_Body, handicraftController.getItems);

router.post('/items',
    ensureAuthenticated,
    ensureHandicraft,
    uploadImagesWithLimit('images', 4),
    validateItemCreation,
    validateItemImagesField,
    resizeItemImages,
    handicraftController.addItem);

router.put('/items/:itemId',
    ensureAuthenticated,
    ensureHandicraft,
    uploadImagesWithLimit('images', 4),
    validateItemModification,
    resizeItemImages,
    handicraftController.updateItem);

router.delete('/items/:itemId',
    ensureAuthenticated,
    ensureHandicraft,
    validateQuery_Params_Body,
    handicraftController.deleteItem
);

module.exports = router;

