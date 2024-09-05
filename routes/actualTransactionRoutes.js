const express = require('express');
const router = express.Router();

const actTransactionControler = require('../controllers/actTransactionController');
const authController = require('../controllers/authController')

router.use(authController.protect); // Ensure user is authenticated for all routes

router.route('/').get(actTransactionControler.restrictToFamily,actTransactionControler.getAllActTransaction).post(actTransactionControler.createActTransaction)

router
.route('/:id')
.get(actTransactionControler.restrictToFamily,actTransactionControler.getActTransaction).patch(actTransactionControler.updateActTransaction).delete(actTransactionControler.deleteActTransaction)


















module.exports = router;