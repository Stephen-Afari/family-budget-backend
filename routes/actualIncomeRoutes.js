const express = require('express');
const router = express.Router();

const actIncomeControler = require('../controllers/actIncomeController');

router.route('/').get(actIncomeControler.getActAllIncome).post(actIncomeControler.createActIncome)

router
  .route('/:id')
  .get(actIncomeControler.getActIncome).patch(actIncomeControler.updateActIncome).delete(actIncomeControler.deleteActIncome)




















module.exports = router;