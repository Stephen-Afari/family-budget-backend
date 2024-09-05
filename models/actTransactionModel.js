const mongoose = require('mongoose');
const slugify = require('slugify'); //slugify is a popular npm package that converts strings into URL-friendly slugs. Input String: "A Tour of the Best Beaches" Output Slug: "a-tour-of-the-best-beaches"

const actTransactionSchema = new mongoose.Schema({
date: {
    type: Date,
    default: Date.now()
},
subGroup:String,
parent:{
    type:String,
    required:[true,'An entry must have a parent']
},
description:String,
amount:Number,
target: Number,
slug: String,
family: {
  type: mongoose.Schema.ObjectId,
  ref: 'Family',
  required: true
},
user: {
  type: mongoose.Schema.ObjectId,
  ref: 'User',
  required: true
},
createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },



},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)
//DOCUMENT MIDDLEWARE: runs before the save command and .create() command
actTransactionSchema.pre('save', function (next) {
    this.slug = slugify(this.parent, { lower: true });
    next();
  });

const ActTransaction = mongoose.model('ActTransaction', actTransactionSchema);

module.exports= ActTransaction;