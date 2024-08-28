const Transaction = require('../models/transactionModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

//Using Factory functions
exports.getAllIncome = factory.getAll(Transaction);
exports.createIncome = factory.createOne(Transaction);
exports.getIncome = factory.getOne(Transaction);
exports.updateIncome = factory.updateOne(Transaction);
exports.deleteIncome = factory.deleteOne(Transaction);