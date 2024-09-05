const ActTransaction = require('../models/actTransactionModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

//Using Factory functions
exports.getAllActTransaction = factory.getAll(ActTransaction);
exports.createActTransaction = factory.createOne(ActTransaction);
exports.getActTransaction = factory.getOne(ActTransaction);
exports.updateActTransaction = factory.updateOne(ActTransaction);
exports.deleteActTransaction = factory.deleteOne(ActTransaction);
exports.restrictToFamily= factory.restrictToFamily(ActTransaction);