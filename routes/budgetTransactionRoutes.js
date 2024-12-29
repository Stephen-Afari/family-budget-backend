const express = require('express');
const router = express.Router();

const transactionControler = require('../controllers/transactionController');
const authController = require('../controllers/authController')

router.use(authController.protect); // Ensure user is authenticated for all routes

router.route('/').get(transactionControler.restrictToFamily,transactionControler.getAllTrans).post(transactionControler.createTrans).delete(transactionControler.deleteAllTrans)

router
  .route('/:id')
  .get(transactionControler.restrictToFamily,transactionControler.getTrans).patch(transactionControler.updateTrans).delete(transactionControler.deleteTrans)

















module.exports = router;