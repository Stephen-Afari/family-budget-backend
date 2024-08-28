
const ActIncome= require('../models/actIncomeModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');


//Using Factory functions
exports.getActAllIncome = factory.getAll(ActIncome);
exports.createActIncome = factory.createOne(ActIncome);
exports.getActIncome = factory.getOne(ActIncome);
exports.updateActIncome = factory.updateOne(ActIncome);
exports.deleteActIncome = factory.deleteOne(ActIncome);