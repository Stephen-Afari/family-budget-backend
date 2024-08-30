const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

//The sharp library is known for its high-performance image processing capabilities, allowing developers to manipulate and convert images in various ways.
const sharp = require('sharp');
//The multer package is a middleware for handling multipart/form-data, which is used for uploading files in Node.js applications
//multipart/form-data is a content type used for uploading files and submitting forms that contain binary data. It's commonly used when you need to send files, such as images or documents, as part of a form submission.
//Multi-Part Requests: multipart/form-data allows a form to be submitted as multiple parts, each with its own content type and encoding. Each part can contain different types of data, including files.
//Form Encoding: When a form is submitted with multipart/form-data, the browser encodes the form fields and files into the request body, separating each part with boundary markers.
//Server Parsing: On the server side, a library or middleware (like multer for Node.js) parses the incoming request body, extracts the form fields and files, and makes them available for processing.

const multer = require('multer');
//multer.memoryStorage(): This method configures multer to store uploaded files in memory, rather than saving them to disk.
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    //his function filters the uploaded files based on their MIME type, allowing only image files.
    if (file.mimetype.startsWith('image')) {
    //A callback function to indicate whether the file should be accepted or rejected.
      cb(null, true);
    } else {
      cb(new AppError('Not an image! Please upload only images', 400), false);
    }
  };
  //fileFilter: Applies the multerFilter function to validate uploaded files.
  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });

  exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
    // Check if a file was uploaded
    if (!req.file) return next();
  
    // Generate a unique filename for the image
    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  
    // Process the image using sharp
    await sharp(req.file.buffer)
      .resize(500, 500) // Resize the image to 500x500 pixels
      .toFormat('jpeg') // Convert the image to JPEG format
      .jpeg({ quality: 90 }) // Set JPEG quality to 90%
      .toFile(`public/img/users/${req.file.filename}`); // Save the image to the file system
  
    // Proceed to the next middleware
    next();
  });
//exports.uploadUserPhoto: Sets up multer to handle file uploads with the field name photo and exports it as middleware.
//filterObj Function: Creates a new object containing only the specified fields from an original object. 
exports.uploadUserPhoto = upload.single('photo');
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
}; 

exports.getUser = factory.getOne(User);

//Reason: This route (updateMe) is intended for updating non-sensitive user information. Password changes should be handled by a different route (/signup or a dedicated password change route) to ensure proper handling and security.
exports.updateMe = catchAsync(async (req, res, next) => {
    //console.log(req.file);
    //console.log(req.body);
    //1)Create Error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError('This route is not defined. Please use /signup instead', 400)
      );
    }
    //2) Filtered out unwanted field names not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');
    if (req.file) filteredBody.photo = req.file.filename; //adds filename to the returned object
    //3) Update the new user
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  });

//The exports.createUser function is a placeholder for an API route that is not yet implemented. Here’s a detailed explanation of its purpose and functionality:
exports.createUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!',
    });
  };

  //Purpose: Sets req.params.id to req.user.id. This line of code is used to modify the req.params object to ensure that the route handler receives the correct user ID.
//req.user.id: Typically, req.user is populated by authentication middleware (like a JWT verification middleware), and it contains the ID of the currently authenticated user.
  exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
  };
  //Do not update passwords with this!!
  exports.updateUser = factory.updateOne(User);
  exports.getAllUsers = factory.getAll(User);
  exports.deleteUser = factory.deleteOne(User);

  exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
  
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });