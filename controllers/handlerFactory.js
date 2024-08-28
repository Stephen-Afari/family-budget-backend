const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getAll = (Model) =>

    catchAsync(async (req, res, next) => {
      //To allow for Nested GET reviews on tour
      let filter = {};
      if (req.params.transId) filter = { budg: req.params.transId };
  //req.query is an object in Express.js that contains key-value pairs of the query string parameters in the URL.
  //For example, if you have a URL like http://example.com/api/v1/tours?sort=price&limit=10, req.query would be an object like this:
  // {
  //   sort: 'price',
  //   limit: '10'
  // }
      const features = new APIFeatures(Model.find(filter), req.query) 
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const doc = await features.query;
  
      res.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
          data: doc,
        },
      });
    });

    exports.deleteOne = (Model) =>
        catchAsync(async (req, res, next) => {
          const doc = await Model.findByIdAndDelete(req.params.id);
          //console.log('deleted Tour');
          if (!doc) {
            return next(new AppError('No tour found with that ID', 404));
          }
          res.status(204).json({
            status: 'success',
            data: null,
          });
        });
      
      exports.updateOne = (Model) =>
        catchAsync(async (req, res, next) => {
          const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
          });
          if (!doc) {
            return next(new AppError('No document found with that ID', 404));
          }
          res.status(200).json({
            status: 'success',
            data: {
              data: doc,
            },
          });
        });
      
      exports.createOne = (Model) =>
        catchAsync(async (req, res, next) => {
          const doc = await Model.create(req.body);
          res.status(201).json({
            status: 'success',
            data: {
              data: doc,
            },
          });
        });
      
      exports.getOne = (Model) =>
        catchAsync(async (req, res, next) => {
          let query = Model.findById(req.params.id);
          //if (popOptions) query = query.populate(popOptions);
          const doc = await query;
          if (!doc) {
            return next(new AppError('No document found with that ID', 404));
          }
          res.status(200).json({
            status: 'success',
            data: {
              data: doc,
            },
          });
        });