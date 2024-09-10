
const Family= require('../models/familyModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');


//Using Factory functions
exports.getAllFamily = factory.getAll(Family);
exports.createFamily = factory.createOne(Family);
exports.getFamily = factory.getOne(Family);
exports.updateFamily = factory.updateOne(Family);
exports.deleteFamily = factory.deleteOne(Family);
// exports.restrictToFamily= factory.restrictToFamily(Income);