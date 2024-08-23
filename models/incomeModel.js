const mongoose = require('mongoose');
const slugify = require('slugify'); //slugify is a popular npm package that converts strings into URL-friendly slugs. Input String: "A Tour of the Best Beaches" Output Slug: "a-tour-of-the-best-beaches"

const incomeSchema = new mongoose.Schema({
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
createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },



})

const Income = mongoose.model('Income', incomeSchema);

module.exports= Income;