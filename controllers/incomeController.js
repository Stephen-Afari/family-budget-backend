
const Income= require('../models/incomeModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');


//Using Factory functions
exports.getAllIncome = factory.getAll(Income);
exports.createIncome = factory.createOne(Income);
exports.getIncome = factory.getOne(Income);
exports.updateIncome = factory.updateOne(Income);
exports.deleteIncome = factory.deleteOne(Income);