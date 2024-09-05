const express = require('express');
const router = express.Router();

const transactionControler = require('../controllers/transactionController');
const authController = require('../controllers/authController')

router.use(authController.protect); // Ensure user is authenticated for all routes

router.route('/').get(transactionControler.restrictToFamily,transactionControler.getAllIncome).post(transactionControler.createIncome)

router
  .route('/:id')
  .get(transactionControler.restrictToFamily,transactionControler.getIncome).patch(transactionControler.updateIncome).delete(transactionControler.deleteIncome)

















module.exports = router;