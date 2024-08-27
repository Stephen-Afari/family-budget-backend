// const fs = require('fs');

// const budgetIncome = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/budg-inc`))

// exports.getAllBudgInc = (req, res) => {
//     console.log(req.requestTime);
  
//     res.status(200).json({
//       status: 'success',
//       requestedAt: req.requestTime,
//       results: budgetIncome.length,
//       data: {
//         budgetIncome
//       }
//     });
//   };

const Income= require('../models/incomeModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

//exports.getAllIncome = factory.getAll(Income);