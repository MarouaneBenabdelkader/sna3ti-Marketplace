const validateLoginFields = require('../middlewares/validateLoginFields')
const authController = require('../controllers/authController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const validateQuery_Params_Body = require('../middlewares/validateQuery_Params_Body')
const adminController = require('../controllers/adminController')
const express = require('express')
const router = express.Router()
router.post('/login', validateLoginFields, authController.login);
router.post('/admin/login', validateLoginFields, adminController.login);
router.post('/logout', ensureAuthenticated, authController.logout);
// Route for password reset request
router.post('/forgot-password', authController.forgotPassword);
// Route for password reset
router.post('/reset-password', authController.resetPassword);
router.post('/verifyPhoneNumber',authController.verifyPhoneNumber)
router.get('/verify-email/:verificationToken', validateQuery_Params_Body, authController.verifyEmail);
router.put('/update-password', ensureAuthenticated, authController.updatePassword);
//? TODO: Add route for isAuthenicated (check if user is logged in)

module.exports = router