const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const actIncomeControler = require('../controllers/actIncomeController');

router.use(authController.protect); // Ensure user is authenticated for all routes

router.route('/').get(actIncomeControler.restrictToFamily,actIncomeControler.getActAllIncome).post(actIncomeControler.createActIncome)

router
  .route('/:id')
  .get(actIncomeControler.restrictToFamily,actIncomeControler.getActIncome).patch(actIncomeControler.updateActIncome).delete(actIncomeControler.deleteActIncome)




















module.exports = router;