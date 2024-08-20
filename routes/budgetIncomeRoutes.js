const express = require('express');
const router = express.Router();

const budgetController = require('../controllers/budgetController');

router.route('/').get(budgetController.getAllBudgInc)



















module.exports = router;