const express = require("express");
const adminController = require('../controllers/adminController')
const validateRegistrationFieldsAdmin = require("../middlewares/validateRegistrationFieldsAdmin");
const validateProfileImageField = require('../middlewares/validateProfileImageField');
const { resizeProfileImage } = require('../middlewares/resizeImages');
const uploadProfileImage = require("../middlewares/uploadProfileImage");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ensureAdmin = require("../middlewares/ensureAdmin");

const router = express.Router();

// Authentication routes
router.post('/add-admin',
    ensureAuthenticated,
    ensureAdmin,
    validateRegistrationFieldsAdmin,
    adminController.addAdmin)


router.get('/handicrafts',
    ensureAuthenticated,
    ensureAdmin,
    adminController.getHandicrafts)
router.put('/accept-handicrafts/:handicraft',
    ensureAuthenticated,
    ensureAdmin,
    adminController.acceptHandicraft)

router.delete('/handicrafts/:handicraft',
    ensureAuthenticated,
    ensureAdmin,
    adminController.deleteHandicraft)

router.put('/accept-items/:itemId', 
    ensureAuthenticated,
    ensureAdmin,
    adminController.acceptItem)
router.delete('/items/:itemId', ensureAuthenticated,
 ensureAdmin, 
 adminController.deleteItem)

router.get('/items', ensureAuthenticated, ensureAdmin, adminController.getItems)
router.delete('/customers/:customerId', ensureAuthenticated, ensureAdmin, adminController.deleteCustomer)
router.get('/customers/:customerId?', ensureAuthenticated, ensureAdmin, adminController.getCustomers)


module.exports = router