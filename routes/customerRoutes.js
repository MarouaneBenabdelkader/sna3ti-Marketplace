const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const { uploadImagesWithLimit } = require('../middlewares/limitNumberOfUploads');
const validateRegistrationFieldsCustomer = require("../middlewares/validateRegistrationFieldsCustomer");
const validateProfileImageField = require('../middlewares/validateProfileImageField');
const { resizeProfileImage } = require('../middlewares/resizeImages');
const uploadProfileImage = require("../middlewares/uploadProfileImage");
const validateRating = require("../middlewares/validateRating");
const validateQuery_Params_Body = require("../middlewares/validateQuery_Params_Body");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ensureCustomer = require("../middlewares/ensureCustomer");
// Authentication routes
router.post('/signup',
    uploadProfileImage.single("profileImage"),
    validateRegistrationFieldsCustomer,
    validateProfileImageField,
    resizeProfileImage,
    customerController.signup
)

router.get('/profile', ensureAuthenticated, ensureCustomer, customerController.getProfile)
router.post('/follow-handicraft/:handicraftId', ensureAuthenticated, ensureCustomer, validateQuery_Params_Body, customerController.followHandicraft)
router.post('/unfollow-handicraft/:handicraftId', ensureAuthenticated, ensureCustomer, validateQuery_Params_Body, customerController.unfollowHandicraft)

router.post('/rate-handicraft/:handicraftId', ensureAuthenticated, ensureCustomer, validateRating, customerController.rateHandicraft)
router.post('/unRate-handicraft/:handicraftId', ensureAuthenticated, ensureCustomer, customerController.unRateHandicraft)


router.post('/save-item/:itemId', ensureAuthenticated, ensureCustomer, validateQuery_Params_Body, customerController.saveItem)
router.post('/unsave-item/:itemId', ensureAuthenticated, ensureCustomer, validateQuery_Params_Body, customerController.unsaveItem)

router.post('/rate-item/:itemId', ensureAuthenticated, ensureCustomer, validateQuery_Params_Body, customerController.rateItem)
router.post('/unrate-item/:itemId', ensureAuthenticated, ensureCustomer, customerController.unrateItem)

router.get('/my-saved-items', ensureAuthenticated, ensureCustomer, customerController.getMySavedItems)
router.get('/itemsOfHanicraftsIfollow', ensureAuthenticated, ensureCustomer, customerController.getFollowedHandicraftItems)
module.exports = router
