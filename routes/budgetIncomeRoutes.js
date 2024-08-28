const express = require('express');
const router = express.Router();

const incomeControler = require('../controllers/incomeController');

router.route('/').get(incomeControler.getAllIncome).post(incomeControler.createIncome)

router
  .route('/:id')
  .get(incomeControler.getIncome).patch(incomeControler.updateIncome).delete(incomeControler.deleteIncome)

















module.exports = router;