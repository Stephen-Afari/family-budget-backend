const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const familyController = require('../controllers/familyController');

//router.route('/').get(authController.restrictTo('admin'),familyController.getAllFamily).post(familyController.createFamily)
router.route('/').get(familyController.getAllFamily).post(familyController.createFamily)

router
.route('/:id')
.patch(familyController.updateFamily).delete(familyController.deleteFamily)







module.exports = router;