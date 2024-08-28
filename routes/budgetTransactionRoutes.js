const express = require('express');
const router = express.Router();

const transactionControler = require('../controllers/transactionController');

router.route('/').get(transactionControler.getAllIncome).post(transactionControler.createIncome)

router
  .route('/:id')
  .get(transactionControler.getIncome).patch(transactionControler.updateIncome).delete(transactionControler.deleteIncome)

















module.exports = router;