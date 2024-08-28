const express = require('express');
const router = express.Router();


 const actTransactionControler = require('../controllers/actTransactionController');

router.route('/').get(actTransactionControler.getAllActTransaction).post(actTransactionControler.createActTransaction)

// router
//   .route('/:id')
//   .get(actTransactionControler.getActTransaction).patch(actTransactionControler.u).delete(actTransactionControler.deleteIncome)


















module.exports = router;