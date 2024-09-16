const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getAll = (Model) =>

    catchAsync(async (req, res, next) => {
      //To allow for Nested GET reviews on tour
      let filter = {};
      //if (req.params.transId) filter = { budg: req.params.transId };

  // Add family filter based on the logged-in user
  if (req.user && req.user.family && req.user.family._id) {
    // Filter based on the family ID
    filter.family = req.user.family._id;  
  }
  console.log('Family Filter:', filter);
   // Optionally allow for nested GET requests (if applicable)
   if (req.params.transId) filter = { ...filter, budg: req.params.transId };
  // console.log(filter)
  //req.query is an object in Express.js that contains key-value pairs of the query string parameters in the URL.
  //For example, if you have a URL like http://example.com/api/v1/tours?sort=price&limit=10, req.query would be an object like this:
  // {
  //   sort: 'price',
  //   limit: '10'
  // }
  const features = new APIFeatures(
    Model.find(filter).populate({
      path: 'family',
      populate: {
        path: 'users', // Populate the users field within the family
        model: 'User', // Specify the model if necessary
      },
    })
    .populate('user'), // Populate the user field directly on the document, // Add .populate() to populate the family field
    req.query
  )
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const doc = await features.query;
 console.log('doc:',doc)
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
            return next(new AppError('No item found with that ID', 404));
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
      // If the user is logged in and has a family, attach the family ID to the request body
    if (req.user && req.user.family) {
      req.body.family = req.user.family._id; // Automatically set the family from the logged-in user
      console.log('Family ID for new document:', req.body.family);
    }
    console.log('Logged in user:', req.user);
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

//You can create another middleware to ensure that the user can only access data related to their family.
  exports.restrictToFamily = (Model) => async (req, res, next) => {
    const data = await Model.find({ family: req.user.family._id });
    if (!data) {
      return res.status(403).json({ message: 'No access to this data' });
    }
    req.familyData = data;
    next();
  };
  