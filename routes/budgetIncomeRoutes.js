const express = require('express');
const router = express.Router();

const incomeControler = require('../controllers/incomeController');
const authController = require('../controllers/authController')

router.use(authController.protect); // Ensure user is authenticated for all routes

router.route('/').get(incomeControler.restrictToFamily,incomeControler.getAllIncome).post(incomeControler.createIncome)

router
  .route('/:id')
  .get(incomeControler.restrictToFamily,incomeControler.getIncome).patch(incomeControler.updateIncome).delete(incomeControler.deleteIncome)

















module.exports = router;