const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getAll = (Model) =>

    catchAsync(async (req, res, next) => {
      //To allow for Nested GET reviews on tour
      let filter = {};
      if (req.params.transId) filter = { tour: req.params.transId };
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
