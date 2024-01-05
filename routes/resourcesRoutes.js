const express = require('express');
const router = express.Router();
const validateQuery_Params_Body = require('../middlewares/validateQuery_Params_Body');
const resourcesController = require('../controllers/resourcesController');
// TODO: aggresive testing of this route is required to ensure that it works as expected
router.get("/handicrafts/:handicraftId?", resourcesController.getHandicrafts);
router.get("/:handicraftId?/items/:itemId?", validateQuery_Params_Body, resourcesController.getItems);
router.get('/top-rated-handicrafts', resourcesController.getTopRatedHandicrafts);
router.get('/top-rated-items', resourcesController.getTopRatedItems);
module.exports = router;