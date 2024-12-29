const Transaction = require('../models/transactionModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

//Using Factory functions
exports.getAllTrans = factory.getAll(Transaction);
exports.createTrans = factory.createOne(Transaction);
exports.getTrans = factory.getOne(Transaction);
exports.updateTrans = factory.updateOne(Transaction);
exports.deleteTrans = factory.deleteOne(Transaction);
exports.restrictToFamily= factory.restrictToFamily(Transaction);
exports.deleteAllTrans= factory.deleteAll(Transaction);