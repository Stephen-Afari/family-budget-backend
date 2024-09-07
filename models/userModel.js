const crypto = require('crypto'); // for hashing password
const mongoose = require('mongoose');
const validator = require('validator');

// bcryptjs is a popular JavaScript library used for hashing passwords securely. It allows you to generate password hashes and compare passwords to their hashes in a secure manner.
//use bcrypt for password hashing and crypto for other cryptographic tasks like encryption, token generation, and general-purpose hashing.
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please tell us your name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
    family: {
      type: mongoose.Schema.ObjectId,
      ref: 'Family',
      // required: [true, 'Please provide your family name'],
    },
  
    role: {
      type: String,
      enum: ['member', 'admin'],
      default: 'member',
    },
  
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please, confirm your password'],
      validate: {
        //This only works on SAVE or CREATE a new one
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!',
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  });
  //if modified, we hash
  userSchema.pre('save', async function (next) {
    //Run this function if password was actually modified
    if (!this.isModified('password')) return next();
  
    //Hash the password with cost of 12
    //HERE
    this.password = await bcrypt.hash(this.password, 12);
    //Delete the passwordConfirm field
    this.passwordConfirm = undefined;
    next();
  });
  
  userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000; //This should be 1000
    next();
  });
  //userSchema.methods allows you to add custom methods to your Mongoose schema. These methods can be called on instances (documents) of the schema.
  //candidatePassword: This is the plain text password that the user provides when attempting to log in.
  //userPassword: This is the hashed password stored in the database for the user.
  //bcrypt.compare takes the plain text password and hashes it using the same salt that was used to hash the userPassword, then compares the two hashes.
//If the hashes match, bcrypt.compare returns true, indicating that the passwords are the same. If they don't match, it returns false.
  userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  
  //The regular expression /^find/ matches any method that starts with "find" (e.g., find, findOne, findById, etc.). This means the middleware will run before any of these queries.
  //this.find({ active: { $ne: false } }); modifies the query to include an additional filter condition. Specifically, it adds a condition to only find documents where the active field is not equal ($ne) to false.
  userSchema.pre(/^find/, function (next) {
    //'this' keyword points to the current query
    this.find({ active: { $ne: false } });
    next();
  });
  
  userSchema.methods.changedPasswordAfter = function (jwTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimeStamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
      //console.log(changedTimeStamp, jwTTimestamp);
      return jwTTimestamp < changedTimeStamp;
    }
    // False means NOT changed
    return false;
  };
  
  userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
  //For security reasons, the raw reset token should not be stored in the database. Instead, a hashed version of the token is stored.
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    console.log({ resetToken }, this.passwordResetToken);
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };
  const User = mongoose.model('User', userSchema);
  module.exports = User;